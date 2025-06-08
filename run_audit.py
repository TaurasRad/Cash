#!/usr/bin/env python3
import os
import sys
import datetime
from urllib.parse import urlparse

from dotenv import load_dotenv
from playwright.sync_api import sync_playwright
from supabase import create_client
from storage3.exceptions import StorageApiError
from openai import OpenAI
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

# ─── Load environment once ─────────────────────────────────────────────────────
load_dotenv()


def run_audit(web_link: str) -> str:
    """
    Runs the full audit pipeline for the given URL.
    Returns the filename of the generated PDF.
    Raises RuntimeError on any failure.
    """
    # ─── 1) Gather & validate config ───────────────────────────────────────────
    api_key         = os.getenv("OPENAI_API_KEY")
    supabase_url    = os.getenv("SUPABASE_URL")
    supabase_key    = os.getenv("SUPABASE_KEY")
    supabase_bucket = os.getenv("SUPABASE_BUCKET")
    smtp_host       = os.getenv("SMTP_HOST")
    smtp_port       = int(os.getenv("SMTP_PORT", 465))
    smtp_user       = os.getenv("SMTP_USER")
    smtp_password   = os.getenv("SMTP_PASSWORD")
    country         = os.getenv("COUNTRY")
    email_to        = os.getenv("EMAIL_TO")

    missing = [k for k,v in [
        ("OPENAI_API_KEY", api_key),
        ("SUPABASE_URL", supabase_url),
        ("SUPABASE_KEY", supabase_key),
        ("SUPABASE_BUCKET", supabase_bucket),
        ("SMTP_HOST", smtp_host),
        ("SMTP_USER", smtp_user),
        ("SMTP_PASSWORD", smtp_password),
        ("COUNTRY", country),
        ("EMAIL_TO", email_to),
    ] if not v]
    if missing:
        raise RuntimeError(f"Missing required env vars: {', '.join(missing)}")

    # ─── 2) Screenshot ──────────────────────────────────────────────────────────
    parsed  = urlparse(web_link)
    domain  = parsed.netloc.replace(":", "_")
    ts      = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    shot_fn = f"{domain}_{ts}.png"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page    = browser.new_page()
        page.goto(web_link, wait_until="networkidle")
        page.screenshot(path=shot_fn, full_page=True)
        browser.close()

    # ─── 3) Upload to Supabase Storage ───────────────────────────────────────────
    supabase = create_client(supabase_url, supabase_key)
    bucket   = supabase.storage.from_(supabase_bucket)

    with open(shot_fn, "rb") as f:
        data = f.read()

    resp = bucket.upload(shot_fn, data)
    if getattr(resp, "error", None):
        # if duplicate, update; else error
        if "Duplicate" in str(resp.error):
            upd = bucket.update(shot_fn, data)
            if getattr(upd, "error", None):
                raise RuntimeError(f"Supabase update failed: {upd.error}")
        else:
            raise RuntimeError(f"Supabase upload failed: {resp.error}")

    # ─── 4) Retrieve public URL ──────────────────────────────────────────────────
    pub = bucket.get_public_url(shot_fn)
    if isinstance(pub, dict):
        screenshot_url = pub.get("publicUrl") or pub.get("public_url")
    else:
        screenshot_url = getattr(pub, "publicUrl", None) or getattr(pub, "public_url", None) or (pub if isinstance(pub, str) else None)
    if not screenshot_url:
        raise RuntimeError("Failed to get public URL for screenshot")

    # ─── 5) Upload image to OpenAI ──────────────────────────────────────────────
    client = OpenAI(api_key=api_key)
    with open(shot_fn, "rb") as img:
        upload_resp = client.files.create(file=img, purpose="vision")
    file_id = getattr(upload_resp, "id", None) or getattr(upload_resp, "file_id", None)
    if not file_id:
        raise RuntimeError("OpenAI file upload failed")

    # ─── 6) Generate audit via ChatCompletion ──────────────────────────────────
    prompt = f"""
I want a comprehensive, in-depth CRO & UX audit of the e-commerce site {web_link}, illustrated with the landing-page screenshot at {screenshot_url}.  
Do NOT cover SEO—focus purely on Conversion Rate Optimization and User Experience, leveraging Baymard Institute benchmarks and Cialdini’s persuasion principles.

Your deliverable should include:

• **Executive Summary** (1–2 pages):  
  - Top 5 strategic insights  
  - 3–5 quick-win recommendations with estimated effort (low/med/high) and impact (low/med/high)  
  - Overall CRO score (0–100) per page type

• **Detailed Audit** (table-driven):  
  - **Rows**: Page Type (Homepage, Category Page, Product Page)  
  - **Columns**:  
    1. **Checkpoint ID** (e.g., H1, C3, P7)  
    2. **Page Type**  
    3. **UX/CRO Area** (e.g., Navigation, Hero, Filters, Persuasion)  
    4. **Observation** (concise factual finding)  
    5. **Benchmark/Data** (e.g., Baymard benchmark %, Cialdini principle)  
    6. **Strengths** (what’s working well)  
    7. **Suggested Improvement** (actionable, who/what/how)  
    8. **Priority** (High / Medium / Low)  
    9. **Estimated Effort** (hrs or “dev/QA/PM”)  

  - Ensure **100+ unique checkpoints** across all pages.  
  - Include **inline mini-tables or callouts** for key numeric data (e.g., “Baymard average add-to-cart rate: 34% vs. current 22%”).  
  - Annotate or reference sample screenshots (e.g., “See Fig. 2: unclear CTA button on hero”).

• **Section Breakdown** (apply to each page type):

  1. **Navigation & Structure**  
     - Menu clarity (5–7 categories, naming logic)  
     - Highlight active page, breadcrumb hierarchy  
     - Persistent search bar visibility & iconography  
     - Intermediate category pages vs. flat product lists  

  2. **Homepage Presentation**  
     - First impression: trust signals, visual hierarchy  
     - Hero clarity: value proposition, CTA prominence, image relevance  
     - Offering overview: category teasers, featured products  
     - Carousel control: manual arrows, no auto-play  
     - Pop-ups: timing, relevance, mobile usability  
     - Trust badges & social proof above the fold  
     - Above-the-fold CTA presence  

  3. **Category Pages**  
     - Filter logic: fault-tolerance, mobile accordions  
     - Sort options: relevance, price, popularity, newness  
     - Product card completeness: image(s), title, price, rating, stock  
     - Instant filter feedback & result count  
     - “No results” UX with suggestions  
     - Active filters UI & clear “remove all”

  4. **Search Experience**  
     - Permanent search bar, autosuggest with images & categories  
     - Typo tolerance, synonym support, accent handling  
     - “Did you mean…” alternatives, relevant first results  
     - No-results page with popular categories & tips  

  5. **Product Pages**  
     - Bullet-point USPs & key specs up top  
     - High-res images: zoom, 360°, contextual lifestyle shots  
     - Variant selectors: button UI, sold-out styling  
     - Transparent pricing (VAT, shipping), availability & ETA  
     - Reviews: average score summary, filterable reviews list  
     - Trust badges (“Best Seller”, certifications)  
     - Cross-sell & upsell (“Frequently bought together”)  
     - Clear returns & warranty info near price  

  6. **Cialdini Persuasion Layers**  
     - Authority: certifications, expert quotes, years of operation  
     - Scarcity: real-time stock counts, timed offers  
     - Social Proof: live counters (“12 sold today”), top-seller badges  
     - Reciprocity: free guides, discount codes for first orders  
     - Consistency: wishlist, recently viewed, micro-commitments  
     - Liking: team photos, brand story, friendly tone  

  7. **Mobile-First & Accessibility**  
     - Responsive layouts, tappable CTAs (>48 px), scalable images  
     - Mobile menu UX (hamburger spacing, sticky actions)  
     - Load performance: LCP <3 s, FID, CLS; use skeleton loaders  
     - WCAG contrast ratios, alt text, keyboard navigation  

  8. **Copywriting & Microcopy**  
     - Contextual CTAs (“Add to Bag”, “Explore Styles”)  
     - Form hints & error messages (“example@domain.com”)  
     - Benefit-driven USPs (“Stay dry in any storm”)  
     - Consistent tone (informal vs. formal) and active voice  

  9. **Performance & Tech**  
     - Load metrics analysis & recommendations  
     - Lazy-loading, modern image formats (WebP/AVIF)  
     - Async/defer scripts, CDN & caching strategy  
     - Perceived speed improvements (progress bars, skeletons)

  10. **Dark Patterns & Negative UX**  
      - Remove confirm-shaming, misleading timers, pre-checked options  
      - Easy access to contact, cancellation, account deletion  
      - Minimize disruptive upsells in checkout  

  11. **Quick Wins & Growth Opportunities**  
      - At least 10 fast-track optimizations:  
        • What it costs (time/tech)  
        • Expected lift (%)  
        • Priority  

  12. **Personalized Recommendations**  
      - Tailor to industry (fashion, electronics, B2B)  
      - Personalization & A/B test ideas based on top 3 friction points  

Format your audit as a professional slide-deck or report, with clear headings, numbered figures/tables, captions, and an appendix of raw data and screenshots. Make every recommendation concrete, actionable, and ready for immediate implementation.

""".strip()

    chat_resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert CRO & UX analyst."},
            {
                "role": "user",
                "content": prompt,
                "attachments": [
                    {"type": "file_id", "file_id": file_id, "purpose": "analysis", "alt_text": "Landing page screenshot"}
                ],
            },
        ],
    )
    report = chat_resp.choices[0].message.content.strip()

    # ─── 7) Render to PDF ────────────────────────────────────────────────────────
    pdf_fn = f"{domain}_{ts}_cro_report.pdf"
    c = canvas.Canvas(pdf_fn, pagesize=letter)
    width, height = letter
    y = height - 40

    for para in report.split("\n\n"):
        for line in para.split("\n"):
            buf = ""
            for w in line.split():
                if len(buf) + len(w) + 1 > 80:
                    c.drawString(40, y, buf)
                    y -= 14
                    buf = w + " "
                else:
                    buf += w + " "
            if buf:
                c.drawString(40, y, buf)
                y -= 14
        y -= 10
        if y < 40:
            c.showPage()
            y = height - 40

    c.save()

    # ─── 8) Email the PDF ────────────────────────────────────────────────────────
    msg = MIMEMultipart()
    msg["Subject"] = "Your In-Depth CRO Audit Report"
    msg["From"]    = smtp_user
    msg["To"]      = email_to
    html = f"""
<html>
  <body style="font-family:Verdana,sans-serif;padding:20px;background:#f2f2f2;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:20px;
                border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      <h1 style="color:#333;">Hello!</h1>
      <p style="color:#555;font-size:14px;">
        🔍 Your full CRO & UX audit for <strong>{web_link}</strong> is attached.
      </p>
      <p style="color:#555;font-size:14px;">
        Cheers,<br/><em>Your FixMySite Team 🚀</em>
      </p>
    </div>
  </body>
</html>
"""
    msg.attach(MIMEText(html, "html"))

    with open(pdf_fn, "rb") as f:
        part = MIMEApplication(f.read(), _subtype="pdf")
        part.add_header("Content-Disposition", "attachment", filename=pdf_fn)
        msg.attach(part)

    ctx = ssl.create_default_context()
    if smtp_port == 465:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port, context=ctx)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.ehlo()
        server.starttls(context=ctx)
        server.ehlo()

    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()

    return pdf_fn


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python mainscript.py <URL>")
        sys.exit(1)
    result_pdf = run_audit(sys.argv[1])
    print(f"✅ Audit complete, PDF generated: {result_pdf}")

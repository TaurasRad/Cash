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

def main():
    # ─── 0) Load all config from .env ───────────────────────────────────────────
    load_dotenv()
    api_key        = os.getenv("OPENAI_API_KEY")
    supabase_url   = os.getenv("SUPABASE_URL")
    supabase_key   = os.getenv("SUPABASE_KEY")
    supabase_bucket= os.getenv("SUPABASE_BUCKET")
    smtp_host      = os.getenv("SMTP_HOST")
    smtp_port      = int(os.getenv("SMTP_PORT", 465))
    smtp_user      = os.getenv("SMTP_USER")
    smtp_password  = os.getenv("SMTP_PASSWORD")
    country        = os.getenv("COUNTRY")
    email_to       = os.getenv("EMAIL_TO")

    # ─── 1) Validate essentials ─────────────────────────────────────────────────
    if not api_key:
        print("❌ Missing OPENAI_API_KEY in .env"); sys.exit(1)
    if not (supabase_url and supabase_key and supabase_bucket):
        print("❌ Missing Supabase config in .env"); sys.exit(1)
    if not (smtp_host and smtp_user and smtp_password):
        print("❌ Missing SMTP config in .env"); sys.exit(1)
    if not (country and email_to):
        print("❌ Missing COUNTRY or EMAIL_TO in .env"); sys.exit(1)
    if len(sys.argv) < 2:
        print("Usage: python mainscript.py <URL>"); sys.exit(1)
    web_link = sys.argv[1]

    # ─── 2) Capture full-page screenshot ─────────────────────────────────────────
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
    print(f"✅ Screenshot saved as {shot_fn}")

    # ─── 3) Upload screenshot to Supabase ────────────────────────────────────────
    supabase = create_client(supabase_url, supabase_key)
    bucket   = supabase.storage.from_(supabase_bucket)
    with open(shot_fn, "rb") as f:
        data = f.read()

    try:
        resp = bucket.upload(shot_fn, data)
        if getattr(resp, "error", None):
            raise StorageApiError(resp.error, None, getattr(resp, "status_code", None))
        print("🚀 Uploaded screenshot.")
    except StorageApiError as e:
        if "Duplicate" in str(e) or getattr(e, "statusCode", None) == 409:
            print("⚠️ Already exists—updating…")
            upd = bucket.update(shot_fn, data)
            if getattr(upd, "error", None):
                print("❌ Update failed:", upd.error); sys.exit(1)
            print("🔄 Update successful.")
        else:
            print("❌ Supabase error:", e); sys.exit(1)

    # Extract the actual public URL
    pub = bucket.get_public_url(shot_fn)
    if isinstance(pub, dict):
        screenshot_url = pub.get("publicUrl") or pub.get("public_url")
    elif hasattr(pub, 'public_url'):
        screenshot_url = pub.public_url
    elif hasattr(pub, 'publicUrl'):
        screenshot_url = pub.publicUrl
    else:
        screenshot_url = pub if isinstance(pub, str) else None
    print("🌐 Screenshot URL:", screenshot_url)

    # ─── 4) Init OpenAI client ──────────────────────────────────────────────────
    client = OpenAI(api_key=api_key)

    # ─── 5) Upload screenshot to OpenAI ────────────────────────────────────────
    print("⏫ Uploading screenshot to OpenAI…")
    with open(shot_fn, "rb") as img:
        upload_resp = client.files.create(
            file=img,
            purpose="vision"
        )
    file_id = getattr(upload_resp, 'id', None) or getattr(upload_resp, 'file_id', None)
    print(f"🔖 OpenAI file_id = {file_id}")

    prompt = f"""
I want a complete, in-depth CRO audit of the e-commerce website {web_link}.Base your analysis primarily on the landing page screenshot found at {screenshot_url}—use it as the foundation for all insights and recommendations wherever possible.
The audit should specifically focus on conversion rate optimization (CRO) and user experience (UX). Use UX benchmark data from the Baymard Institute and apply persuasion principles from Cialdini. The audit is NOT focused on SEO. Analyze and provide recommendations for each part of the webshop (homepage, category pages, product pages).
Make sure the report:
Is complete (more than 100 CRO/UX checkpoints);


Is concrete and action-oriented (no vagueness or stating the obvious);


Can be visually supported with tables, sample screenshots, and comparisons;


Is written as if presented to an experienced e-commerce manager or conversion specialist.



Structure of the advice
Present your analysis in a table:

Vertically: by page type (Homepage, Category page, Product page)
Horizontally: columns with Page Type, Observation, Strengths, Suggested Improvement





The audit should consist of the following sections:
Navigation & structure:


Assess whether the main menu is clear, with a maximum of 5–7 main categories that are logically named (avoid jargon).


Evaluate whether there are clear intermediate category pages instead of directly linking to a product list.


Check if the current page is always highlighted in the menu (e.g., with an underline style or color).


Ensure the search bar is always visible on desktop and mobile, with a clear magnifying glass icon and placeholder text.


Breadcrumbs should be present and logically structured so users always know where they are.


Homepage presentation:


First impression: does the homepage look professional, clean, trustworthy, and targeted?


Hero: includes a clear message, CTA, and relevant image. The hero should not waste too much space without a conversion goal.


Shows a broad offering: not just one category, but various top products or categories spread across the page.


Evaluate carousel usage: are they manually controllable? No auto-play, clear arrows/dots.


Pop-ups: do they appear after X seconds or on exit intent? Are they mobile-friendly? Are they relevant and valuable?


Trust: trust badges, review scores, and secure payment methods visible?


CTA above the fold: is there a call-to-action button visible without scrolling?


Category pages:


Filters: clear, logical, fault-tolerant. Are they easy to find and use on mobile?


Sorting: is a sort option available (price, relevance, popularity, new)?


Product cards: do they include at least an image, price, product name, rating, availability?


Layout: grid or list view correctly applied to screen size.


Filter feedback: quick interaction without page reload. Shows result count immediately.


No results: gives suggestions or shows related products instead of just "0 results".


Active filters: visible above the product list and easy to remove.


Search function:


Is the search bar permanently visible and prominently placed?


Does the search function support autosuggestions with categories and products?


Is the search fault-tolerant (e.g., typos, plurals, accents)?


Are synonyms supported?


Are the first results in the list relevant?


Does the 'no results' page suggest alternatives, like "Did you mean...?" or popular categories?


Product page:


Does the description include all necessary info (material, dimensions, use)?


Does the page start with key USPs in bullet points?


Images: high quality, multiple angles, context shots, zoom option.


Variant selection (sizes, colors): shown as buttons instead of dropdowns. Sold-out variants visually marked.


Clear pricing, including VAT and shipping costs (or a note about it).


Availability: is it clear whether it's in stock and the expected delivery time.


Reviews: average score visible at the top, detailed review section lower on the page, with sorting options.


Badge/trust: e.g., "Best buy", certification, or “most chosen”.


Upsell/cross-sell: "Frequently bought together", "Goes well with...", etc.


Return info: show free return or return period clearly near the price or delivery info.


Psychological persuasion (Cialdini):


Authority: show certifications, well-known media, experts, or number of years of experience.


Scarcity: “Only 3 left in stock”, timer for a temporary deal – but only if it’s real.


Social proof: “Sold 12x today”, “Most popular choice”, customer reviews.


Reciprocity: give something for free like size chart, first-time discount code, free e-book.


Consistency: offer a wishlist, “recently viewed” products. Let people take small actions (e.g., create account after purchase).


Liking: use photos of real people, tell something about the team or mission. Use a friendly tone of voice.


Mobile experience:


Is the design fully responsive? No overlap, proper text size, scalable images.


Is the menu usable on mobile? (hamburger menu with enough spacing).


CTA buttons are easy to tap (>48px, enough white space).


Sticky buttons (cart, search) are present but not intrusive.


Are carousels, filters, dropdowns, and pop-ups usable on mobile?


Load speed: first view within 3 seconds. Use skeleton loading or progress indicators if it takes longer.


Copywriting & microcopy:


CTAs: clear, action-oriented, unique per context (“View now”, “Order immediately” instead of “Submit”).


Microcopy in forms: show examples, give friendly error messages, build trust (“we don’t send spam”).


USPs: mention benefits, not just features (“Waterproof” → “Stay dry in any rainstorm”).


Accessible language, targeted to the audience. Informal or professional – but consistent.


No mix of ‘formal’ and ‘informal’ tone. Avoid passive sentences. Everything written from the customer’s perspective.


Tech & load time (UX performance):


Analyze load time (LCP, FID, CLS) for mobile and desktop.


Apply lazy loading to images outside the viewport.


Optimize images with modern formats (WebP, AVIF).


Scripts: are they loaded async or deferred? Are there unnecessary external scripts?


Use caching/CDN to speed up repeat visits.


Is perceived speed improved through skeleton loading or instant text display?


Dark patterns & negative UX:


Are there confirmshaming texts in pop-ups? (“No, I prefer to pay more”)? Remove them.


Are countdown timers misused? (Restart on every refresh?) → avoid.


Are options pre-selected by default (insurance, newsletter sign-up)? Remove them.


Is contact info or cancel/delete account hard to find? → Make it easily accessible.


Are upsells overly present in the funnel or breaking the flow? → Move to less critical stages.


Quick wins & growth opportunities:


List at least 10 optimizations that take little time but increase conversion immediately.


For example: improve search bar visibility, sticky CTA on mobile, expand product cards with badges, clear return text near price, etc.


For each quick win: specify what it costs (time/tech), what it delivers (impact), and the priority (high, medium, low).


Personal recommendations (optional):


Based on the webshop type (fashion, electronics, B2B, etc.): which elements deserve extra attention?


Are there personalization opportunities (recently viewed, personalized banners, mail flows)?


Suggestions for A/B tests based on the main friction points in the funnel.


Important: Make the analysis so practical that a team can immediately act on it. Avoid fluff. Structure it per page and per section. Use tables where needed (e.g., with scores, recommendations, examples).
This audit should result in a complete CRO advisory document that is usable for both strategic and tactical improvements and serves as a blueprint for a conversion optimization project.

""".strip()

    # ─── 6) Build & send prompt to OpenAI ───────────────────────────────────────
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert CRO & UX analyst."},
            {"role": "user", "content": prompt, "attachments": [
                {"type": "file_id", "file_id": file_id, "purpose": "analysis", "alt_text": "Landing page screenshot"}
            ]}
        ]
    )
    report = response.choices[0].message.content.strip()

    # ─── 7) Render report → PDF ─────────────────────────────────────────────────
    pdf_fn = f"{domain}_{ts}_cro_report.pdf"
    c = canvas.Canvas(pdf_fn, pagesize=letter)
    width, height = letter
    y = height - 40
    for para in report.split("\n\n"):
        for line in para.split("\n"):
            buf = ""
            for w in line.split():
                if len(buf) + len(w) + 1 > 80:
                    c.drawString(40, y, buf); y -= 14; buf = w + " "
                else:
                    buf += w + " "
            if buf:
                c.drawString(40, y, buf); y -= 14
        y -= 10
        if y < 40:
            c.showPage(); y = height - 40
    c.save()
    print(f"✅ PDF saved as {pdf_fn}")

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
        🔍 Your full CRO & UX audit for <strong>{web_link}</strong> is attached 
        (including the screenshot you provided). Let me know your thoughts!
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

    context = ssl.create_default_context()
    if smtp_port == 465:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port, context=context)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.ehlo(); server.starttls(context=context); server.ehlo()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()
    print(f"✅ Report emailed to {email_to}")

if __name__ == "__main__":
    main()

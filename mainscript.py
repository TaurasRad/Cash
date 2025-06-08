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
placeholder
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

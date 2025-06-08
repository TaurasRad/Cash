# screenshot.py

import os
import sys
from urllib.parse import urlparse
import datetime

from dotenv import load_dotenv
from playwright.sync_api import sync_playwright
from supabase import create_client
from storage3.exceptions import StorageApiError

def main():
    # ─── Load config ─────────────────────────────────────────────────────────────
    load_dotenv()

    supabase_url    = os.getenv("SUPABASE_URL")
    supabase_key    = os.getenv("SUPABASE_KEY")
    supabase_bucket = os.getenv("SUPABASE_BUCKET")

    if not (supabase_url and supabase_key and supabase_bucket):
        print("Error: SUPABASE_URL, SUPABASE_KEY and SUPABASE_BUCKET must be set in .env")
        sys.exit(1)

    if len(sys.argv) < 2:
        print("Usage: python screenshot.py <URL>")
        sys.exit(1)
    web_link = sys.argv[1]

    # ─── Screenshot ───────────────────────────────────────────────────────────────
    parsed   = urlparse(web_link)
    domain   = parsed.netloc.replace(":", "_")
    ts       = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{domain}_{ts}.png"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page    = browser.new_page()
        page.goto(web_link, wait_until="networkidle")
        page.screenshot(path=filename, full_page=True)
        browser.close()
    print(f"✅ Saved screenshot to {filename}")

    # ─── Upload to Supabase with duplicate-handling ────────────────────────────────
    supabase = create_client(supabase_url, supabase_key)
    bucket   = supabase.storage.from_(supabase_bucket)

    with open(filename, "rb") as f:
        data = f.read()

    try:
        upload_resp = bucket.upload(filename, data)
        if getattr(upload_resp, "error", None):
            # wrap in exception to trigger fallback
            raise StorageApiError(upload_resp.error, None, getattr(upload_resp, "status_code", None))
        print("🚀 Uploaded successfully.")
    except StorageApiError as e:
        # If it's a duplicate (HTTP 409), update instead
        if "Duplicate" in str(e) or getattr(e, "statusCode", None) == 409:
            print("⚠️ File exists, updating instead…")
            update_resp = bucket.update(filename, data)
            if getattr(update_resp, "error", None):
                print("❌ Update failed:", update_resp.error)
                sys.exit(1)
            print("🔄 Updated existing file successfully.")
        else:
            print("❌ Upload failed:", e)
            sys.exit(1)

    # ─── Get public URL ──────────────────────────────────────────────────────────
    public_resp = bucket.get_public_url(filename)
    public_url = (
        getattr(public_resp, "public_url", None)
        or getattr(public_resp, "publicUrl", None)
        or (public_resp.data.get("publicUrl") if getattr(public_resp, "data", None) else None)
    )
    print("🌐 Public URL:", public_url)

if __name__ == "__main__":
    main()

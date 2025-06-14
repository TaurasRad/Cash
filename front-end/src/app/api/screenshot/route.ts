import { NextRequest, NextResponse } from "next/server";

// Puppeteer must be installed: npm install puppeteer
import puppeteer from "puppeteer";

export const runtime = "nodejs"; // Ensure this runs in a Node.js environment

export async function POST(req: NextRequest) {
  try {
    const { url: rawUrl } = await req.json();
    let url = rawUrl;
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
    // Normalize URL: prepend https:// if missing
    if (!/^https?:\/\//.test(url)) {
      url = `https://${url}`;
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

    // Inject CSS to hide common cookie/consent popups
    await page.addStyleTag({
      content: `
        [id*="cookie" i], [class*="cookie" i],
        [id*="consent" i], [class*="consent" i],
        [id*="gdpr" i], [class*="gdpr" i],
        [id*="eu-cookie" i], [class*="eu-cookie" i],
        [id*="alert" i][class*="cookie" i],
        [id*="privacy" i], [class*="privacy" i],
        [role="dialog"][aria-label*="cookie" i],
        [role="dialog"][aria-label*="consent" i],
        [data-testid*="cookie" i], [data-testid*="consent" i],
        [data-testid*="gdpr" i],
        [data-testid*="privacy" i] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `,
    });

    const screenshot = await page.screenshot({ type: "png", fullPage: true });
    await browser.close();

    const base64 = Buffer.from(screenshot).toString("base64");
    return NextResponse.json({ image: `data:image/png;base64,${base64}` });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Screenshot failed" },
      { status: 500 }
    );
  }
}

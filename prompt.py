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
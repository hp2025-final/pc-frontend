# Project Plan and Architecture (Consolidated)

## 0. Overview
- Purpose: Build a fast, professional tech store with WhatsApp ordering now and a Custom PC Builder later.
- Strategy: Headless WooCommerce (catalog/admin) on Cloudways + Next.js (storefront) on Vercel — single live environment to keep budget and complexity low. Start without Cloudflare; add later if needed.
- MVP Scope: Browse categories/products → view product → “Order on WhatsApp” → tracking. No cart/online payments.

## 1. Roles, Ownership, and Governance
- Roles
  - Infrastructure/DevOps: Cloudways, DNS/CDN, SSL, backups, env secrets, deploys
  - Backend Admin (WooCommerce): catalog structure, product data, media, taxonomy
  - Frontend: Next.js architecture, data layer, UI, performance, analytics
  - QA: test plans, device testing, regression, performance checks
  - SEO/Content: metadata policy, copy, sitemaps/robots, redirects
- Access & Secrets
  - Owner manages environment variables in Vercel (Next.js) and Cloudways (WP). No external vault; no secrets in code. Provide `.env.example` in repo.
  - Access via Git (collaborators) and optional collaborator access to Vercel/Cloudways. Single live credentials; Woo REST key is read‑only, least privilege.
- Change Management
  - Changes deploy from Git `main` to live via Vercel auto‑deploy. Use Vercel Preview Deployments for PRs when convenient (no separate staging needed). Maintain a lightweight release checklist in repo.
  - Keep a changelog in `TODO.md` or repo releases.

## 2. Tech Stack and Architecture
- Backend (Catalog/Admin): WordPress + WooCommerce
  - Woo used strictly for products, categories, brands, attributes, media.
  - API: Start with Woo REST API. WPGraphQL optional later.
  - Minimal plugins: WooCommerce, lightweight security. Avoid page builders; image optimization handled by Next.js.
- Frontend (Storefront): Next.js (App Router)
  - Data layer in `src/lib/woocommerce.ts` (single abstraction for API calls).
  - Rendering: ISR for product/category pages; SSR for search.
  - Event tracking (analytics) and error monitoring integrated.
- Hosting: Cloudways (WordPress) + Vercel (Next.js), single live environment
  - Cloudways: one WP app (PHP/MySQL) live; Varnish enabled for anonymous users.
  - Vercel: one project (live). Preview deployments for PRs are optional and free; no separate staging project.
  - Environments: Single live environment to reduce cost/complexity.
- CDN/Security
  - Start with Vercel Edge for the storefront and Cloudways Varnish for WP.
  - Cloudflare (WAF/CDN) is optional and can be added later to protect WP and improve edge caching.
  - Block indexing of backend subdomain via robots.txt and rules.

## 3. URL Structure and Taxonomy
 - Categories (final):
   - Prebuilt PCs — `prebuilt-pcs`
   - Custom PCs — `custom-pcs`
   - Laptops — `laptops`
   - Monitors — `monitors`
   - Printers — `printers`
   - Servers — `servers`
   - Peripherals — `peripherals`
     - Gaming Mice — `gaming-mice`
     - Gaming Keyboards — `gaming-keyboards`
     - Headsets — `headsets`
     - Mousepads — `mousepads`
     - Webcams — `webcams`
   - Components — `components`
     - CPUs — `cpus`
     - Motherboards — `motherboards`
     - RAM — `ram`
     - Graphics Cards — `gpus`
     - Storage — `storage`
       - SSD — `ssd`
       - HDD — `hdd`
     - Power Supplies — `power-supplies`
     - PC Cases — `pc-cases`
     - CPU Coolers — `cpu-coolers`
     - Case Fans — `case-fans`
     - Networking Cards — `networking-cards`
   - Networking (optional) — `networking`
     - Wi‑Fi Routers — `wifi-routers`
     - Switches — `switches`
   - Software (optional) — `software`
     - Operating Systems — `operating-systems`
     - Office/Utilities — `office-utilities`
   - Accessories (optional) — `accessories`
     - Cables & Adapters — `cables-adapters`
     - Mounts & Stands — `mounts-stands`
 - Brand taxonomy (final, examples): `lenovo`, `hp`, `dell`, `asus`, `acer`, `msi`, `apple`, `intel`, `amd`, `nvidia`, `gigabyte`, `asrock`, `evga`, `corsair`, `cooler-master`, `deepcool`, `lian-li`, `kingston`, `gskill`, `samsung`, `western-digital`, `seagate`, `crucial`, `tp-link`, `logitech`, `razer`, `hyperx`, `brother`, `epson`, `canon`, `synology`, `qnap`
 - Slug rules: lowercase, hyphenated, stable. If renamed, create redirects.
 - Product slugs: `{brand}-{model}` where applicable; avoid future changes.
 - Routes (frontend):
   - `/` home
   - `/category/[slug]`
   - `/product/[slug]`
   - `/search?q=...&category=...&brand=...&price=...`
   - `/about`, `/contact`, `/warranty`, `/privacy`, `/terms`

## 4. Data & Content Standards
- Required per product: name, sku, price, category, brand, featured image (WebP preferred), 3–5 gallery images, short description.
- Optional: long description, key specs (5–8 bullets), stock status.
- Images: ≤ 1200px longest side, compressed (WebP/JPEG), neutral backgrounds.
- Copy: short, scannable; no HTML tables; avoid keyword stuffing.
- WhatsApp policy: single E.164 number in a global option; message template includes product name, SKU/ID, URL, price.

## 5. Rendering, Caching, and Revalidation
- Next.js Rendering Strategy
  - Product pages: ISR with `revalidate` 15–60 min (align with price changes).
  - Category pages: ISR with `revalidate` 30–120 min.
  - Home: ISR 60–180 min.
  - Search: SSR (always fresh).
- On-Demand Revalidation
  - A WP→Next webhook: when a product updates/publishes, WP calls `/api/revalidate` (shared secret on Vercel) to purge product and impacted category routes immediately.
- Woo Caching
  - Use Varnish for anonymous visitors; bypass for logged-in admins and API POSTs.
  - Redis only if DB pressure appears in profiling.
- CDN
  - Cloudflare for static assets/images; verify cache headers from Next.js.

## 6. WhatsApp Order Flow
- Link format: `https://wa.me/<E164>?text=<encoded>`.
- Message template: "<ProductName> (SKU:<sku>) — <URL> — Price:<price>. I’m interested."
- UX: button on product page, toast after click: “Opened WhatsApp. If not, copy message.” Include a Copy button.
- Tracking: fire `whatsapp_click` event with `{productId, sku, category, price}`.
 - Configured number: `+923162694747` (E.164)

## 7. Search, Filters, and Sorting
- Server-side search on the backend API through the Next.js data layer.
- Facets: category, brand, price range. Add more only with data to justify.
- Sorting: relevance (default), newest, price low→high, price high→low.
- Empty states: show suggestions and top categories.

## 8. SEO, Sitemaps, Robots, and Metadata
- Canonical URLs set by Next.js.
- Robots: allow indexing on live; during build‑out, temporarily disallow until ready, then switch to allow.
- XML sitemaps: generated by Next.js (products, categories, pages) and linked from robots. Do not expose WP sitemaps publicly.
- Structured data: JSON‑LD Product with name, brand, sku, price, currency, availability, URL, image on product pages.
- Breadcrumbs: logical, consistent.
- Backend subdomain: blocked from indexing.

## 9. Performance Budgets and UX
- Budgets (mobile): LCP ≤ 2.5s, CLS ≤ 0.1, minimal TBT.
- Avoid heavy client-side JS; prefer server components and native features.
- Image placeholders with fixed dimensions to prevent layout shift.
- No heavy animation/carousels; lazy-load below the fold.

## 10. Analytics and Observability
 - Analytics: GA4 (chosen).
 - Events: `page_view`, `product_view`/`view_item`, `view_item_list`, `search`, `filter_apply`, `sort_change`, `whatsapp_click`.
 - Error tracking: Sentry on frontend; validate with a test event on a Preview deployment or locally, not on live traffic.
 - Uptime monitoring: UptimeRobot for live storefront and WP only.

## 11. Security and Hardening
- WP: change default admin, use strong passwords, limit roles (Admins, Shop Managers), security plugin for brute-force/WAF, keep plugins minimal and updated.
- Next.js: env secrets via Vercel Project Settings; never commit secrets.
- Backups: automatic daily (7–14 days); manual snapshot pre-launch.

## 12. PC Builder (Post-MVP)
- Approach: step-by-step configurator, live price total, final action is WhatsApp summary.
- Data model (in Woo): motherboard as anchor; attributes for CPU socket, chipset, RAM type (DDR gen), form factor, PCIe gen, M.2 support, etc.
- Rules (v1): enforce CPU↔motherboard socket, RAM type, case form factor; PSU guidance only.
- Shareable builds: URL encodes selected product IDs.
- Analytics: track step completion and drop-offs.

## 13. Environments and Deployments
- Live only: WP and Next.js with SSL; analytics property configured.
- Domains/subdomains: Frontend `www.<domain>` (or root); backend `wp.<domain>`.
- Deployments: Vercel auto‑deploy from GitHub to live; use Preview deployments on PRs when convenient. WP updates via SFTP/SSH or Git on Cloudways as needed. Keep a lightweight review checklist.

## 14. Milestones and Acceptance Criteria
- MVP Ready
  - Catalog seeded with 3–5 real products per category
  - Frontend pages: home, category, product, search, static pages
  - WhatsApp flow working with analytics
  - Performance budgets met on live (mobile)
  - SEO basics: robots, sitemaps (Next.js), canonicals, product JSON‑LD
- Launch Ready
  - QA checklist passed on devices and connections (4G mid-tier)
  - Monitoring and error tracking active
  - Backups and rollback plan documented

---

# Phases (Non-Overlapping)

1) Phase A — Foundations and Access (Live-Only)
- Lock: API (REST now), taxonomy/slugs, ISR windows, WhatsApp number, analytics stack, roles/access.
- Access: provide Git access; owner sets env vars in Vercel/Cloudways; share WP admin user.
- Deliverables: updated plan (`PLAN.md`), env var inventory, `.env.example` committed.

2) Phase B — Live Infrastructure Setup
 - Create Cloudways WP app (live) with SSL and daily backups.
 - Create Vercel project (Hobby) for Next.js; connect GitHub repo/branch; auto‑deploy `main`.
 - Configure env vars in Vercel and Cloudways; set uptime monitors for live only.
 - Deliverables: WP live URL + Vercel live URL working with SSL.

3) Phase C — WooCommerce Setup (Catalog-Only)
- Install Woo and lightweight security; set permalinks; harden admin; disable XML‑RPC.
- Create categories/brands; finalize slugs; global option for WhatsApp number.
- Seed 3–5 products per category with standardized images/specs.
- Deliverables: REST API returns products/categories; minimal real data present.

4) Phase D — Next.js Storefront and Data Layer
- App Router project; env config; `src/lib/woocommerce.ts` data client.
- Pages: home, category, product, search, static pages; basic layout and brand.
- Integrate ISR/SSR; initial performance pass.
- Deliverables: frontend runs locally and on live, pulling real data.

5) Phase E — WhatsApp Flow and Analytics
- Add product CTA + encoded message; toast with copy fallback.
- GA4 events wired (`view_item`, `view_item_list`, `search`, `whatsapp_click`).
- Deliverables: WhatsApp works on mobile/desktop; events visible in GA4.

6) Phase F — Revalidation and Caching
- Implement WP→Next on‑demand revalidate webhook with shared secret.
- Tune ISR windows; confirm Varnish bypass rules for admins.
- Deliverables: price/content changes appear quickly; caches behave correctly.

7) Phase G — Search, Filters, and Sorting
- Implement server‑side search and facets (category, brand, price); sorting.
- Solid empty‑states; no dead ends.
- Deliverables: relevant search results in ≤2s; filters stable.

8) Phase H — SEO, Performance, and QA
- Next.js sitemaps, JSON‑LD, canonicals; robots allow when ready.
- Mobile performance meets budgets; device/network QA (4G mid‑tier); 404/redirects.
- Deliverables: QA sign‑off and performance report.

9) Phase I — Content and Launch
- Replace placeholders with final copy/images; finalize static pages and policies.
- Lightweight launch checklist; remove `noindex` if previously set.
- Deliverables: live site announced.

10) Phase J — Post‑Launch Operations
- Weekly checks; monitor errors, WhatsApp intents, CWV; controlled WP updates.
- Optional: add Cloudflare WAF/CDN for WP if needed.

11) Phase K — Custom PC Builder (Beta)
- Data attributes in Woo; minimal compatibility rules; builder UI with shareable links and WhatsApp summary.
- Analytics on steps/drop‑offs; iterate based on feedback.
- Deliverables: end‑to‑end builder labeled Beta.

---

## Environment Variables (example)
- Next.js (set in Vercel UI; we provide `.env.example`)
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_WA_NUMBER`
  - `WOOCOMMERCE_BASE_URL`
  - `WOOCOMMERCE_CONSUMER_KEY`
  - `WOOCOMMERCE_CONSUMER_SECRET`
  - `REVALIDATE_SECRET`
- WordPress (set in Cloudways/WP config)
  - `REVALIDATE_ENDPOINT_URL`
  - `REVALIDATE_SECRET`

## Definition of Done (per feature)
- Code reviewed; tests/manual checks passed on live
- Performance and accessibility checks passed
- Tracking events firing and visible
- Docs updated (PLAN.md / TODO.md)

# Daedalus (Monolith) – Build Spec

Goal: Ship a Next.js monolith deployable to Vercel tonight. Non-custom Vercel URL is fine. Custom domain tomorrow.

## Stack
- Next.js 14+ App Router, TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react icons
- next/font (Inter)
- Dark mode toggle (class strategy)
- Mobile-friendly sidebar (Sheet)

## Routes / IA
- `/` Dashboard
- `/docs/*` MDX docs
- `/tools/relay` Relay toolbox
- `/tools/forge` Forge placeholder

## App Shell
- Left sidebar: Dashboard, Docs, Tools (Relay, Forge)
- Top header: “Daedalus” + dark mode toggle
- Use a route group for shell, e.g. `src/app/(shell)/...`

## Dashboard
- 3 cards linking to: Relay, Docs, Forge
- “Recent activity” placeholder

## Docs
- MDX stored locally: `content/docs`
- Implement pages:
  - `/docs/overview`
  - `/docs/relay`
  - `/docs/forge`
  - `/docs/conventions`
- Docs sidebar from static config
- Render MDX with good typography (Tailwind prose)
- “Edit this page” placeholder link (no GitHub integration)

## Tools
### Forge
- `/tools/forge` exists; render a clean “Coming soon” empty state card.

### Relay (toolbox)
Relay is a suite of tools for creating link/nav elements.

UI:
- `/tools/relay` has a left sub-nav (or segmented control) with 3 tools:
  1) Event Bundle
  2) WooCommerce Link Builder
  3) GTM/UTM Link Builder
- On mobile: sub-nav becomes top segmented control.
- Every tool uses an explicit **Generate** button (no live generation).
- Generate disabled until validation passes.
- Outputs shown in consistent “Outputs” panel with copy buttons + toast.
- Save last 10 generated results per tool in localStorage with timestamp; clicking history item refills inputs + regenerates.

Shared structure:
- `src/core/relay/*` for pure link generation functions
- `src/components/*` for UI components: AppShell, Sidebar, Header, ToolSubNav, OutputField, HistoryList

---

## Relay Tool 1: Event Bundle Generator
Goal: Enter event info once and output a bundle:
- Google Calendar link
- Outlook Web link (best-effort)
- Apple Calendar: provide “Download for Apple Calendar (.ics)” button (Apple uses ICS)
- ICS preview + Copy ICS + Download ICS
- “Copy all links” button

Inputs:
- Title (required)
- Description
- Location
- Start date/time (required)
- Timezone selector (default browser timezone)
- All-day toggle:
  - If all-day: date-only inputs
- Ends UI (best practices):
  - “Ends” select with modes:
    A) Specific end date/time (or end date if all-day)
    B) Duration (minutes/hours)
    C) No end (default 60 minutes after start)
  - Provide UI elements per mode
  - For all-day events: helper text that ICS DTEND is exclusive (end date + 1 day)
- Optional URL (event page)
- Organizer name/email (optional)

Validation:
- Required: Title, Start
- If specific end: End must be after start
- If all-day end date: end date must be >= start date

Implementation:
- Link builders: `src/core/relay/eventLinks.ts` using URL + URLSearchParams
- ICS generator: `src/core/relay/ics.ts`
  - Use CRLF, escape text, include UID + DTSTAMP
  - DATE vs DATE-TIME handling
  - Pick one consistent time strategy for v1 (UTC w/ Z recommended) and comment it

---

## Relay Tool 2: WooCommerce Link Builder (classic query params)
Goal: Generate email-safe links that add products to cart and optionally apply coupon.
Inputs:
- Base store URL (required) (e.g. https://example.com)
- Product rows: productId + quantity (repeatable)
- Coupon code (optional)
- Destination path after action (optional): `/cart` or `/checkout`
- UTM fields (optional)
Notes:
- Add-to-cart: use classic query params (`?add-to-cart=ID&quantity=QTY`)
- Coupon application can be best-effort and may require theme/plugin support; label clearly in UI.
Outputs:
- Add to cart link
- Add to cart + coupon link (if coupon provided)
- Checkout/cart variant (if destination provided)
Implementation:
- `src/core/relay/wooLinks.ts`

---

## Relay Tool 3: GTM/UTM Link Builder
Goal: Build a tracked URL for campaigns.
Inputs:
- Destination URL (required)
- UTM fields (source, medium, campaign, content, term)
- Additional query params (rows key/value)
- Preserve fragment (#): append params before fragment
- Link text input for HTML output
Outputs:
- Final tracked URL + Copy
- Copy as HTML `<a>` link
- Reset button
Implementation:
- `src/core/relay/trackingLinks.ts`

---

## README
Include:
- install/run commands
- shadcn init commands + list of required components
- deploy to Vercel steps (basic)

Required shadcn components (minimum):
button, card, input, textarea, select, switch, separator, sheet, toast, tabs or segmented control, collapsible

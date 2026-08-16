# LocalLaunch AI

A £197 one-off marketing desk for small businesses.

The public site explains the offer in detail. After the customer pays on Stripe, this browser unlocks the platform: thirteen drafting rooms, five house agents, a concierge, and a proof ledger.

The studio does not call a paid AI API. House agents draft in the browser. They do not place ads or invent leads.

## Run locally

```bash
cd new-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe

House Operations is **£197 one-off**, paid on the live Payment Link:

https://buy.stripe.com/4gM14ndrHburaZpfZV48001

That URL is public (it is a checkout page, not a secret key) and is already wired into the site.

**Required for the “come inside” step:** in the Stripe Payment Link, set **After payment** to `{your live site}/pay/thanks`. That page unlocks the platform in the customer’s browser.

Optional environment overrides (Vercel → Project → Environment Variables):

- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` — only if the Payment Link URL changes
- `NEXT_PUBLIC_HOUSE_PRICE_LABEL` — only if the amount on the site must match a new Stripe price
- `NEXT_PUBLIC_SITE_URL` — the public site URL (used in sitemap and Open Graph)
- `STRIPE_SECRET_KEY` plus `STRIPE_PRICE_ID_HOUSE` — only if you later switch from Payment Link to Checkout Sessions
- `STRIPE_APPLE_PAY_DOMAIN_ASSOCIATION` — only needed for Apple Pay on a custom domain, not for `buy.stripe.com`

Copy `.env.example` to `.env.local` for local values.

## Go live

The app lives in the `new-project` folder. On Vercel, import the GitHub repo and set the root directory to `new-project`.

## Scripts

- `npm run dev` — development server (webpack)
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run smoke` — generate drafts for every tool and house agent

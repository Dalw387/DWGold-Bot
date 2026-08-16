# LocalLaunch AI

Complimentary studio for small-business marketing drafts, plus House Operations.

This version includes:

- A quieter, more expensive-looking public site
- A house concierge and studio assistant
- Thirteen template rooms, including a campaign pack, SEO brief, and ads copy
- House Operations agents for SEO, Meta ads, Google Ads, social, and measurement
- A proof ledger that only counts rows you type
- An owner trial for DW Gold Trading Ltd
- Stripe Payment Link checkout for House Operations (£197 one-off)

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

That URL is public (it is a checkout page, not a secret key) and is already wired into the site. Apple Pay, Google Pay, Link, and cards appear on Stripe’s page when those methods are enabled on the Stripe account.

Optional environment overrides (Vercel → Project → Environment Variables):

- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` — only if the Payment Link URL changes
- `NEXT_PUBLIC_HOUSE_PRICE_LABEL` — only if the amount on the site must match a new Stripe price
- `NEXT_PUBLIC_SITE_URL` — the public site URL (used in sitemap and Open Graph)
- `STRIPE_SECRET_KEY` plus `STRIPE_PRICE_ID_HOUSE` — only if you later switch from Payment Link to Checkout Sessions
- `STRIPE_APPLE_PAY_DOMAIN_ASSOCIATION` — only needed for Apple Pay on a custom domain, not for `buy.stripe.com`

In the Stripe Payment Link, set **After payment** to `{your live site}/pay/thanks` once the site has a public address.

Copy `.env.example` to `.env.local` for local values.

## Go live

The app lives in the `new-project` folder. On Vercel, import the GitHub repo and set the root directory to `new-project`.

```bash
cd new-project
npx vercel --yes
```

Use `npx vercel --prod` when you want the production alias.

## Scripts

- `npm run dev` — development server (webpack)
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run smoke` — generate drafts for every tool and house agent

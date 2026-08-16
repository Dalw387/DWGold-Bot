# LocalLaunch AI

Complimentary studio for small-business marketing drafts, plus House Operations.

This version includes:

- A quieter, more expensive-looking public site
- A house concierge and studio assistant
- Thirteen template rooms, including a campaign pack, SEO brief, and ads copy
- House Operations agents for SEO, Meta ads, Google Ads, social, and measurement
- A proof ledger that only counts rows you type
- An owner trial for DW Gold Trading Ltd
- Stripe checkout for House Operations (Apple Pay, Google Pay, Link, and card when enabled)

The studio does not call a paid AI API. House agents draft in the browser. They do not place ads or invent leads.

## Run locally

```bash
cd new-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe and Apple Pay

1. In Stripe, create a Payment Link (or a Price) with Apple Pay, Google Pay, and Link switched on.
2. Add the domain in Stripe → Payment methods → Apple Pay, and paste the association file into `STRIPE_APPLE_PAY_DOMAIN_ASSOCIATION`.
3. Set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` on Vercel, or set `STRIPE_SECRET_KEY` plus `STRIPE_PRICE_ID_HOUSE`.
4. Optional: `NEXT_PUBLIC_HOUSE_PRICE_LABEL` if you want the site to show the amount you already set in Stripe. Do not invent a figure.

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

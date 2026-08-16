# LocalLaunch AI

A £197 one-off marketing desk aimed at more local customers.

The public site explains the offer. After the customer pays on Stripe, this browser unlocks twenty-two drafting rooms, seven house agents, a concierge, and a proof ledger.

## Run locally

```bash
cd new-project
npm install
npm run dev
```

## Stripe (live)

The DW Gold Trading Stripe account is live. Product **LocalLaunch House Operations** is Active at **£197.00** (`prod_V5E5a3f90B0MfT`).

Payment Link: https://buy.stripe.com/4gM14ndrHburaZpfZV48001

The site shows **£197 one-off** to match that product. If you change the amount in Stripe, change `NEXT_PUBLIC_HOUSE_PRICE_LABEL` to match. Do not show £179 if Stripe still charges £197.

You can tidy the Stripe product name to `LocalLaunch House Operations` so it matches the site on receipts.

### Make the payment actually let people in

1. Open the Payment Link in Stripe.
2. Set **After payment** to `{your live site}/pay/thanks`  
   Example: `https://your-site.vercel.app/pay/thanks`
3. Turn on Apple Pay, Google Pay, Link, and cards on that link if they are not already on.

Until After payment points at `/pay/thanks`, people pay but may stay on Stripe’s receipt instead of coming inside.

### Finish payouts

If Stripe still shows **Managed Payments · Needs info**, complete that setup guide. Cards can take payment while that is unfinished, but the money may sit in Stripe until identity and bank details are done.

## Email list

The homepage and pay page collect emails (with consent). They are saved on the server in `data/leads.json` (not committed to git). A copy is also emailed to `LEADS_NOTIFY_EMAIL` (defaults to nftdee@gmail.com).

On Vercel, set:

- `OWNER_LEADS_KEY` — a secret you invent
- Then open `https://your-site.vercel.app/owner/leads?key=that-secret`
- Download CSV from that page so you keep a copy (serverless files can reset)

Paying customers also leave their email in **Stripe**.

## Go live on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with the GitHub account that owns `Dalw387/DWGold-Bot`.
2. **Add New** → **Project** → import `Dalw387/DWGold-Bot`.
3. Set **Root Directory** to `new-project`.
4. Environment variables (optional but useful):
   - `NEXT_PUBLIC_SITE_URL` = `https://your-chosen-name.vercel.app`
   - `OWNER_LEADS_KEY` = a long random password
   - `LEADS_NOTIFY_EMAIL` = your inbox
5. Deploy.
6. Copy the live URL.
7. In Stripe, set After payment to `{that URL}/pay/thanks`.

The Payment Link is already live. The website is live once Vercel finishes that deploy.

## Scripts

- `npm run dev` — development server (webpack)
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm run smoke` — generate drafts for every tool and house agent

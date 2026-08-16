# LocalLaunch AI

Complimentary studio for small-business marketing drafts.

This version includes:

- A quieter, more expensive-looking public site
- A browser studio assistant
- Live sketches as you type
- Eight template tools, including Facebook Post Studio
- No accounts, database, payments, or paid AI APIs

## Run locally

```bash
cd new-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

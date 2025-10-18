# SmartPay Dev Demo

Beautiful developer demo that showcases a sign-in / merchant checkout flow, wallet integrations, Supabase auth and data, and Tailwind UI components.

This repository is a Create React App project enhanced with Tailwind CSS, Supabase, Redux, and crypto wallet helpers (MetaMask/Ethers). The README below includes quick start instructions for Windows PowerShell, folder overview, common commands, and contribution tips.

## Quick links

- Live (development): http://localhost:3000
- Framework: Create React App
- Styling: Tailwind CSS
- Auth & DB: Supabase

## Prerequisites

- Node.js LTS (16.x or 18.x recommended)
- npm (comes with Node.js)
- Windows PowerShell (this repo's example commands target PowerShell)

Check your versions:

```powershell
node -v
npm -v
```

## Install & run (PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start the development server (the project includes a `postinstall` that runs start in some setups — you can still run it manually):

```powershell
npm start
```

Open http://localhost:3000 in your browser. The app will hot-reload on changes.

### Run frontend + backend together

From the project root (`D:\backend`), run:

```powershell
npm run start
```

This fires up the CRA dev server and the Express API (via `server/`) in parallel so both environments stay in sync while you develop.

## Backend API (Node + Express)

A lightweight Express backend now lives in `server/` so you can demo the SmartPay flows without relying on Supabase. It ships with mocked data (cards, banks, checkout items, rewards) stored in `server/data/db.json`, and it shares the same root-level `package.json`, so a single `npm install` powers both apps.

### Setup

```powershell
npm install                # installs both frontend + backend deps
copy server\env.example server\.env  # optional: customize PORT, JWT_SECRET
npm run start:server       # launches API on http://localhost:4000
```

### Key endpoints (all prefixed with `/api`)

- `POST /auth/signup` / `POST /auth/login` — returns JWT + sanitized user profile
- `GET /auth/me` — verify session via bearer token
- `GET|POST /users/:userId/cards` — list/add saved cards
- `GET|POST /users/:userId/banks` — list/add linked bank accounts
- `GET /users/:userId/transactions` — most recent purchases
- `GET /checkout/goods/:method` — fetch checkout SKUs filtered by `card`, `bank`, or `crypto`
- `GET /checkout/rates/:symbol` — grab realtime mock crypto rate (e.g. `ETH`)
- `POST /checkout/transactions` — record a new payment attempt
- `GET /dashboard/users/:userId/summary` — rewards + market snapshot for a shopper
- `GET /dashboard/merchant/summary` — performance metrics for the signed-in merchant

Attach `Authorization: Bearer <token>` to protected requests. The sample database seeds two users (`merchant@smartpay.dev` and `user@smartpay.dev`, both with `password123`) so you can hit the API right away.

## Available npm scripts

- npm start — start dev server (react-scripts start)
- npm test — run tests (react-scripts test)
- npm run build — build production bundle (react-scripts build)
- npm run eject — eject CRA config (one-way)

Note: package.json currently contains a `postinstall` script that runs `npm start`. If you prefer to avoid automatically starting the dev server after install, remove or change that script in `package.json`.

## Project structure (important files)

- `src/` — source code
	- `components/` — React components (auth, checkout, dashboard, common)
	- `layouts/MainLayout.jsx` — top-level layout
	- `supabaseClient.jsx` — Supabase SDK init
	- `redux/` — Redux slices and store
	- `pages/` — route pages (Home, Checkout, Dashboard, Auth)
	- `App.js` / `index.js` — app entry points
- `tailwind.config.js` — Tailwind configuration
- `package.json` — scripts and dependencies

If you're exploring the codebase, start with `src/App.js` and `src/pages/Checkout.jsx` to see how the checkout flow and payment sources are wired.

## Wallets and EVM integration

This demo includes helpers for interacting with MetaMask and ethers. Look for `@metamask/detect-provider`, `ethers`, and `@metamask/logo` in dependencies. Tests and components reference wallet detection in `components/checkout`.

## Testing

Run tests with:

```powershell
npm test
```

The project uses React Testing Library and jest.

## Linting & formatting

This repo includes `eslint` and `prettier` in dependencies. Add or enable configs if you want CI linting. You can run prettier manually:

```powershell
npx prettier --check "src/**/*.{js,jsx,css,md}"
npx prettier --write "src/**/*.{js,jsx,css,md}"
```

## Deployment

Build the production bundle:

```powershell
npm run build
```

Then serve the `build/` folder with any static host (Netlify, Vercel, GitHub Pages with adapters, or a simple static server).

## Common troubleshooting

- If the dev server doesn't start, check for port conflicts on 3000 and environment variables that may block startup.
- If Supabase errors appear, verify the keys in `.env.local` and restart the dev server.
- If tailwind styles don't apply, ensure PostCSS/Tailwind is configured and `index.css` imports `@tailwind base; @tailwind components; @tailwind utilities;`.

## Contributing

Contributions are welcome. Small suggestions:

1. Fork and create a feature branch
2. Run tests and linting locally
3. Open a pull request describing the change

If you'd like help with a specific feature (example: add tests for checkout or add CI), open an issue and I can help implement it.

## License

This project doesn't include a license file. Add one (for example MIT) if you plan to publish or share this repository publicly.

## Acknowledgements

- Built from Create React App
- Uses Supabase, Tailwind CSS, and ethers

---

If you'd like, I can also:

- Add a `.env.example` showing the environment variables you need (without secrets)
- Add a short CONTRIBUTING.md and PR template
- Add basic GitHub Actions CI to run tests and lint on PRs

Tell me which of those you'd like next and I'll implement it.

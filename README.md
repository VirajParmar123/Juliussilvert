## 🛒 Julius Silvert — Web App (Vite + React)

Modern storefront-style web app built with **React**, **Vite**, **React Router**, and a component/UI stack (Radix UI + Tailwind utilities).

---

## ✨ What you get

- **⚡ Fast dev + builds**: Vite-powered local dev and production bundling
- **🧭 Client-side routing**: Route-level code-splitting via React Router lazy pages
- **🛍️ App state**: Context providers for cart, favorites, and requisition lists
- **🧩 Component library**: Reusable UI components in `src/app/components/ui`
- **🐳 Docker-ready**: Multi-stage build that serves `dist/` on port **4173**

---

## 🧱 Tech stack

- **Framework**: React 18
- **Build tool**: Vite
- **Routing**: React Router (data router)
- **Styling**: Tailwind CSS (via `@tailwindcss/vite`) + `tailwind-merge`
- **UI**: Radix UI, Lucide icons, Sonner toasts

---

## 🚀 Quickstart (local)

### ✅ Prerequisites

- **Node.js**: 20+ recommended
- **npm**: comes with Node (this repo uses `package-lock.json`)

### ▶️ Install & run

```bash
npm install
npm run dev
```

- App will start on a local dev URL printed in your terminal (commonly `http://localhost:5173`).

### 🏗️ Production build (local)

```bash
npm run build
```

This outputs a static production build to `dist/`.

---

## 🐳 Run with Docker

This repo includes a multi-stage `Dockerfile`:
- **build stage**: installs deps + runs `npm run build`
- **runtime stage**: serves `dist/` using `serve`

### 🔧 Build image

```bash
docker build -t julius-silvert-web .
```

### ▶️ Run container

```bash
docker run --rm -p 4173:4173 julius-silvert-web
```

Open:
- **`http://localhost:4173`**

---

## 🧭 Project workflow (how the app works)

### 1) 🧠 App bootstrap

- Entry point: `index.html` mounts `#root`
- React mount: `src/main.tsx`
- App shell: `src/app/App.tsx`

`App.tsx` wraps the router with global providers:
- **Favorites**
- **Cart**
- **Requisition Lists**

### 2) 🗺️ Navigation & pages

Routes live in `src/app/routes.tsx` and are **lazy-loaded** (code-split per page). Main routes include:

- **`/`** → Home
- **`/category/:category`** → Category listing
- **`/product/:productId`** → Product details
- **`/search`** → Search results
- **`/cart`** → Cart
- **`/checkout`** → Checkout
- **`/favorites`** → Favorites
- **`/account`** → Account
- **`/submit-request`** → Submit request

### 3) 🧩 UI building blocks

- Shared components: `src/app/components/`
  - examples: `Header`, `Footer`, `HeroSection`, `ProductCard`, `ProductCarousel`
- Reusable UI primitives: `src/app/components/ui/`
  - buttons, dialogs, inputs, tabs, drawers, etc.

### 4) 🧰 Data & utilities

- Catalog/data: `src/app/data/`
- Helpers: `src/app/utils/`
  - search/sort, recent searches, saved addresses, etc.
- Constants: `src/app/constants/`

### 5) 📦 Build & output

- `npm run build` creates an optimized production bundle in `dist/`
- Bundling is tuned in `vite.config.ts` (manual chunks for React, router, icons)

---

## 🗂️ Repo structure (high level)

```text
.
├─ index.html
├─ vite.config.ts
├─ Dockerfile
├─ package.json
└─ src
   ├─ main.tsx
   ├─ styles/
   └─ app/
      ├─ App.tsx
      ├─ routes.tsx
      ├─ pages/
      ├─ components/
      │  └─ ui/
      ├─ context/
      ├─ data/
      ├─ utils/
      └─ constants/
```

---

## 🧩 Path alias

The Vite config defines:
- **`@` → `./src`**

So imports can look like:
- `@/app/components/...`

---

## 🧯 Troubleshooting

- **Blank page after running**: ensure you ran `npm install` and then `npm run dev`
- **Docker build fails at `npm ci`**: make sure `package-lock.json` exists and matches `package.json`
- **Port already in use**:
  - Dev: change Vite port or stop the conflicting process
  - Docker: map to a different port, e.g. `-p 8080:4173`

---

## 🤝 Contributing

- Create a branch
- Keep changes focused (one feature/fix per PR)
- Run a quick `npm run build` before opening a PR


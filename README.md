# Astro Render Patterns Demo

## Project Overview

This repository demonstrates various **rendering strategies** available in Astro, showing exactly how data is fetched and delivered to the browser in different scenarios.

It serves as a "textbook example" for comparing:
1.  **Standard SSR** (`/users-ssr`): Traditional server-side rendering (Blocking).
2.  **SSR + Internal API** (`/users-ssr-api-route`): Decoupled architecture where the page fetches from a local API route.
3.  **Static Site Generation (SSG)** (`/users-ssg-api-route`): Data fetched at build time for instant HTML delivery.
4.  **Deferred Streaming** (`/users-defer`): Shows the page shell immediately, then streams in slow content using `server:defer`.
5.  **CMS Integration (SSG)** (`/contentful-users-ssg`): Best practice for Headless CMS (Contentful) to avoid API limits.
6.  **Cached SSR (Fastly Pattern)** (`/contentful-fastly`): SSR with `Surrogate-Control` headers designed for Edge Caching (e.g., Fastly, Cloudflare).

Every page includes a **Request Waterfall** visualization to help you understand the sequence of events (Browser, Server, API, Build).

## Core Technologies

*   **Astro v5**: Configured for **SSR** (`output: 'server'`).
*   **Adapter**: Currently set to **Vercel** (`@astrojs/vercel`) for easy deployment.
*   **Framework**: **Preact** for lightweight interactive islands (`@astrojs/preact`).
*   **CMS**: **Contentful** (includes a Mock Client for instant testing without keys).
*   **Styling**: Scoped CSS + Global Styles.

## Project Structure

```text
major-meteor/
├── astro.config.mjs              # Astro config (Vercel adapter, SSR)
├── .env.example                  # Template for Contentful credentials
├── src/
│   ├── components/
│   │   ├── RequestWaterfall.astro      # Visualization component
│   │   ├── DeferredUser.astro          # Deferred streaming component
│   │   └── like-button/
│   │       ├── LikeButton.tsx          # Interactive Preact island
│   │       └── LikeButtonIsland.astro  # Island wrapper
│   ├── lib/
│   │   ├── contentful.ts               # Contentful client (Mock vs Real switch)
│   │   ├── mock-contentful.ts          # Simulation logic for CMS data
│   │   └── users.ts                    # Shared user fetching logic
│   ├── pages/
│   │   ├── index.astro                 # Landing page with navigation cards
│   │   ├── users-ssr.astro             # Standard Blocking SSR
│   │   ├── users-ssr-api-route.astro   # SSR fetching internal API
│   │   ├── users-ssg-api-route.astro   # Static Generation (SSG)
│   │   ├── users-defer.astro           # Streaming (server:defer)
│   │   ├── contentful-users-ssg.astro  # CMS Integration (Build time fetch)
│   │   ├── contentful-fastly.astro     # Cached SSR (Fastly headers)
│   │   └── api/
│   │       └── users.ts                # Internal API route
│   └── layouts/
│       └── MainLayout.astro            # Shared layout & navigation
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:4321` to see the landing page.

3.  **Use Real Contentful Data (Optional)**:
    By default, the project uses a **Mock Client** so you can run it immediately. To use real data:
    *   Rename `.env.example` to `.env`
    *   Add your `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`.
    *   Open `src/lib/contentful.ts` and switch the commented lines to use the real SDK.

## Deployment

This project is configured for **Vercel** out of the box.

1.  Push to GitHub.
2.  Import project in Vercel.
3.  Deploy (Vercel will auto-detect Astro).

*Note: To deploy to Cloud Run or Node.js hosting, switch the adapter in `astro.config.mjs` back to `@astrojs/node`.*

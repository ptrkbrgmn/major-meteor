# Astro Preact test project


## Project Overview

This repo extends the minimal Astro starter to demonstrate three server rendering patterns plus an interactive island using Preact:

1. Plain SSR page (`users-ssr.astro`): Fetches external user data directly during the server render.
2. SSR via internal API route (`users-ssr-api-route.astro` + `pages/api/users.ts`): Separates data access (API route) from presentation (page), enabling reuse and abstraction of external API details.
3. Deferred streaming (`users-defer.astro` + `DeferredUser.astro`): Uses `server:defer` to stream a placeholder immediately, then swaps in the full user list once rendered on the server, illustrating progressive rendering.
4. Preact client island (`LikeButtonIsland.astro` + `LikeButton.tsx`): Hydrates only the like button for interactivity while the rest of the page remains static HTML.

Core technologies & configuration:
* Astro with Node adapter (`astro.config.mjs`) configured for full SSR (`output: 'server'`).
* TypeScript strict config and shared `User` interface (`src/types/user.ts`).
* Preact integration for lightweight interactive islands (`@astrojs/preact`).
* Internal API route pattern for cleaner architecture and potential future enhancements (caching, auth, transformation).

Navigation links in `MainLayout.astro` make it easy to compare the three data loading strategies side by side. Each list item also embeds the interactive like button island to highlight selective hydration.

At a glance, the project is a teaching / demo app for SSR strategies, streaming, and islands architecture in Astro.

┌── astro.config.mjs
├── package.json
├── public
│   └── favicon.svg
├── README.md
├── src
│   ├── components
│   │   ├── DeferredUser.astro
│   │   ├── UserInfo.tsx
│   │   └── like-button/
│   │       ├── LikeButton.tsx
│   │       └── LikeButtonIsland.astro
│   ├── layouts
│   │   └── MainLayout.astro
│   ├── pages
│   │   ├── api/
│   │   │   └── users.ts
│   │   ├── users-defer.astro
│   │   ├── users-ssr-api-route.astro
│   │   └── users-ssr.astro
│   └── types
│       └── user.ts
└── tsconfig.json
│   │   ├── users-ssr-api-route.astro
│   │   └── users-ssr.astro
│   └── types
│       └── user.ts
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

In `src/components/`, we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Astro Preact test project


## Project Overview

This repo extends the minimal Astro starter to demonstrate multiple delivery patterns plus selective hydration with a Preact island:

1. Plain SSR (`users-ssr.astro`): Fetches external user data directly during the server render.
2. SSR + internal API (`users-ssr-api-route.astro` + `pages/api/users.ts`): Separates data access from presentation, enabling reuse and abstraction of external API details.
3. Streaming defer (`users-defer.astro` + `DeferredUser.astro`): Uses `server:defer` to stream a placeholder immediately, then swaps in the full user list once rendered server-side (progressive rendering).
4. Static Generation + API logic (`users-ssg-api-route.astro`): Calls the API route logic at build time so the generated HTML ships with complete data.
5. Islands interactivity (`LikeButtonIsland.astro` + `LikeButton.tsx`): Hydrates only the like button, keeping the rest of the markup as lightweight static HTML.

Core technologies & configuration:
* Astro with Node adapter (`astro.config.mjs`) configured for full SSR (`output: 'server'`).
* TypeScript strict config and shared `User` interface (`src/types/user.ts`).
* Preact integration for lightweight interactive islands (`@astrojs/preact`).
* Internal API route pattern for cleaner architecture and potential future enhancements (caching, auth, transformation).

Navigation links in `MainLayout.astro` make it easy to compare the three data loading strategies side by side. Each list item also embeds the interactive like button island to highlight selective hydration.

At a glance, the project is a teaching / demo app for Astro data delivery strategies (SSR, internal API abstraction, streaming defer, SSG) and islands architecture.

## File Structure

```text
major-meteor/
├── astro.config.mjs              # Astro config (Node adapter, SSR)
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DeferredUser.astro          # Deferred streaming component
│   │   ├── UserInfo.tsx                # Preact presentational component
│   │   └── like-button/
│   │       ├── LikeButton.tsx          # Interactive Preact island logic
│   │       └── LikeButtonIsland.astro  # Island wrapper (client:load)
│   ├── layouts/
│   │   └── MainLayout.astro            # Shared layout & navigation
│   ├── pages/
│   │   ├── api/
│   │   │   └── users.ts                # Internal API route (JSON users)
│   │   ├── users-defer.astro           # Streaming + server:defer example
│   │   ├── users-ssr-api-route.astro   # SSR page fetching internal API
│   │   ├── users-ssg-api-route.astro   # SSG page invoking API logic at build
│   │   └── users-ssr.astro             # Basic SSR page fetching external API
│   └── types/
│       └── user.ts                     # Shared User interface
└── README.md
```
```

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

Of course. Here is the step-by-step breakdown for a standard Server-Side Rendered (SSR) page, formatted in Markdown.

```

## The Loading Waterfall (SSR)

### On the Server 💻
*When a user visits the page*

1.  **Request Received** ➡️
    A user's browser sends a request to your server for the `/users-ssr` page.

2.  **Code Execution & Data Fetching** 🌍
    The server runs the code in your page's frontmatter. It makes a **live network request** directly to the external API (`https://jsonplaceholder.typicode.com/users`) to fetch the latest data.

3.  **HTML Generation**
    The server uses the freshly fetched data to render the component template into a complete HTML string. It generates the HTML for the layout, the user list, and the static version of each `LikeButtonIsland`.

4.  **Response Sent** 📄
    The server sends the fully formed HTML document to the user's browser. This entire process happens **on the fly** for every request.


### In the Browser 🌐
*After receiving the HTML*

5.  **Initial Render**
    The browser receives the complete HTML and immediately displays the page. The user sees the full, up-to-date list of users. The page is visible but not yet interactive.

6.  **CSS Applied** 🎨
    The browser fetches and applies the necessary CSS to style the page.

7.  **JavaScript Fetch** 📜
    The browser finds the `<script>` tag that Astro automatically added for the interactive `LikeButtonIsland` components and downloads the small JavaScript bundle.

8.  **Hydration** ⚡️
    Once the JavaScript is downloaded and executed, it finds the static button elements already on the page and **hydrates** them, attaching the Preact state and `onClick` event listeners.

9.  **Done** ✅
    The buttons are now fully interactive.

---

## The Loading Waterfall (SSR with API Route)

### On the Server 💻
*When a user visits the page*

1.  **Request Received** ➡️
    A user's browser sends a request to your server for the page (e.g., `/users-ssr-api`).

2.  **Page Script Execution**
    The server starts running the code in your page's frontmatter.

3.  **Internal API Fetch** 🔁
    The page script makes a **`fetch`** request **to its own server**, calling the `/api/users` endpoint. This is a server-to-server communication loop.

4.  **API Route Execution** 🌍
    The server receives this internal request and runs the code in `src/pages/api/users.ts`. This API route now makes the **external network request** to `https://jsonplaceholder.typicode.com/users`.

5.  **API Route Response** 📦
    The API route gets the data from JSONPlaceholder, packages it into a JSON response, and sends it back to the page script that originally called it.

6.  **HTML Generation**
    The page script now has the fresh user data. It proceeds to render the component template into a complete HTML string, mapping over the `users` array and generating the static HTML for the `UserInfo` and `LikeButtonIsland` components.

7.  **Final Response Sent** 📄
    The server sends the fully formed HTML document to the user's browser.

---

### In the Browser 🌐
*After receiving the HTML*

8.  **Initial Render**
    The browser receives the complete HTML and immediately displays the page. The user sees the full, up-to-date list of users. The page is visible but not yet interactive.

9.  **CSS Applied** 🎨
    The browser fetches and applies the necessary CSS to style the page.

10. **JavaScript Fetch** 📜
    The browser finds the `<script>` tag that Astro automatically added for the interactive `LikeButtonIsland` components and downloads the small JavaScript bundle.

11. **Hydration** ⚡️
    Once the JavaScript is downloaded and executed, it finds the static button elements on the page and "hydrates" them, attaching the Preact state and `onClick` event listeners.

12. **Done** ✅
    The buttons are now fully interactive.

---

## The Loading Waterfall (`server:defer`)
This process combines a fast initial page load with a secondary stream of data, creating a robust user experience for slower data fetches.


### On the Server 💻
*A two-part process*

1.  **Instant Initial Response** 📄
    When a user requests the page, the server **immediately** sends back the main page HTML *without* waiting for the deferred data. This initial document contains the layout, headings, and the placeholder content (`<ul id="users-placeholder">`). The server then keeps the connection open.

2.  **Deferred Work & Streaming** 🌊
    *After* sending the initial response, the server starts processing the `<DeferredUsers>` component.
    * It runs the component's script, fetching the user data from the `/api/users` endpoint.
    * It renders the component's template into an HTML string, creating the full user list and the static HTML for each `<LikeButtonIsland>`.
    * Finally, it **streams** this new HTML chunk (the user list `<ul>` and the inline `<script>`) down the same open connection to the browser.

---

### In the Browser 🌐
*A seamless content swap*

3.  **Immediate Placeholder Render**
    The browser receives the initial HTML and instantly displays the page, including the "Loading users…" placeholder. The user sees content right away, even if the data fetch is slow.

4.  **Content Swap** 🔄
    The browser receives the streamed HTML chunk containing the real user list.
    * The small inline `<script>` at the end of the chunk runs immediately.
    * This script finds the placeholder on the page using its `id`.
    * It replaces the placeholder element with the newly arrived user list. The user sees the loading state disappear and the final content appear.

5.  **Island Hydration** ⚡️
    The browser now sees the `LikeButtonIsland` components in the newly added content.
    * It finds the `<script>` tag that Astro automatically added for these interactive islands.
    * It downloads the small JavaScript bundle for the `LikeButton` component.
    * The script runs and **hydrates** the static button elements, attaching the Preact state and `onClick` event listeners.

6.  **Done** ✅
    The page is now fully loaded and fully interactive.

---

## The Loading Waterfall (SSG)
Of course. Here is the loading waterfall for a Static Site Generation (SSG) page, formatted in Markdown.

This approach is the fastest for the end-user because all the data fetching and HTML rendering are done ahead of time.

### During the Build Process ⚙️
*This happens only once, when you run `npm run build`*

1.  **Build Triggered**
    You run the `astro build` command in your terminal. Astro begins to pre-render every static page.

2.  **Direct Function Call**
    For your `users-ssg.astro` page, Astro runs the code in the frontmatter.
    * It **does not** start a server or use `fetch`.
    * Instead, it directly imports and executes the `GET` function from your `src/pages/api/users.ts` file.

3.  **Data Fetching & HTML Generation** 📄
    * The `GET` function runs, fetches the data from the external API (`jsonplaceholder`), and returns it.
    * Astro then uses this data to render the page template into a complete HTML file. This file contains the full user list and the static HTML for each `<LikeButtonIsland>`.

4.  **Final Asset Created** ✅
    The final `users-ssg/index.html` file, with all content "baked in," is saved to the `dist/` folder.

---

### In the Browser 🌐
*When a user visits the page*

5.  **Request** ➡️
    The browser asks the server for the `/users-ssg` page.

6.  **Instant Response** ⚡️
    The server does no work. It simply finds the pre-built `users-ssg/index.html` file and sends it back immediately.

7.  **Initial Render**
    The browser receives the complete HTML and instantly displays the entire page content. It is visible but not yet interactive.

8.  **JavaScript Fetch** 📜
    The browser finds the `<script>` tag that Astro added for the interactive `LikeButtonIsland` components and downloads the small JavaScript bundle.

9.  **Hydration** ✨
    Once the JavaScript is downloaded and executed, it finds the static button elements already on the page and **hydrates** them, attaching the Preact state and `onClick` event listeners.

10. **Done** 👍
    The buttons are now interactive. The rest of the page remains as simple, high-performance HTML.

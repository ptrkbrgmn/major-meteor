import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import preact from '@astrojs/preact';

// For a highly dynamic app, after adding an adapter, you can set your build output 
// configuration to output: 'server' to server-render all your pages by default. 
// This is the equivalent of opting out of prerendering on every page.
// 
// Then, if needed, you can choose to prerender any individual pages that do not 
// require a server to execute, such as a privacy policy or about page.

export default defineConfig({
  output: 'server', // enables SSR
  adapter: vercel({
    imageService: true // Enable image optimization
  }),
  integrations: [preact()],
});


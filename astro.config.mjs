import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import preact from '@astrojs/preact';


// For a highly dynamic app, after adding an adapter, you can set your build output 
// configuration to output: 'server' to server-render all your pages by default. 
// This is the equivalent of opting out of prerendering on every page.
// 
// Then, if needed, you can choose to prerender any individual pages that do not 
// require a server to execute, such as a privacy policy or about page.



export default defineConfig({
  output: 'server', // enables SSR
  // output: 'static', // default is static site generation (SSG)
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [preact()],
});

// src/lib/contentful.ts

/**
 * ------------------------------------------------------------------
 * OPTION 1: REAL CONTENTFUL CLIENT
 * Uncomment the lines below after running: npm install contentful
 * ------------------------------------------------------------------
 */
/*
import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});
*/

/**
 * ------------------------------------------------------------------
 * OPTION 2: MOCK CLIENT (For testing without API keys)
 * This simulates the exact response structure of the Contentful SDK.
 * ------------------------------------------------------------------
 */
export const contentfulClient = {
  getEntries: async ({ content_type }: { content_type: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log(`[MOCK] Fetching ${content_type} from Mock Contentful Client...`);

    // Return dummy data that matches Contentful's "EntryCollection" interface
    return {
      sys: { type: 'Array' },
      total: 5,
      skip: 0,
      limit: 100,
      items: [
        {
          sys: { 
            id: '1', 
            type: 'Entry',
            createdAt: new Date().toISOString() 
          },
          fields: {
            // In Contentful, all your custom data lives in 'fields'
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            company: { name: 'Romaguera-Crona' },
            website: 'hildegard.org'
          }
        },
        {
          sys: { id: '2', type: 'Entry', createdAt: new Date().toISOString() },
          fields: {
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'Shanna@melissa.tv',
            company: { name: 'Deckow-Crist' },
            website: 'anastasia.net'
          }
        },
        {
          sys: { id: '3', type: 'Entry', createdAt: new Date().toISOString() },
          fields: {
            name: 'Clementine Bauch',
            username: 'Samantha',
            email: 'Nathan@yesenia.net',
            company: { name: 'Romaguera-Jacobson' },
            website: 'ramiro.info'
          }
        }
      ]
    };
  }
};

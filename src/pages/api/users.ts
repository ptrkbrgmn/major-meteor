// Benefits of API Routes in Astro:
// - Separation of Concerns: Your .astro page is now only responsible for displaying data. The API route is responsible for providing data.
// - Reusability: Another page or even a client-side script could now fetch the user list from /api/users without duplicating the fetch logic.
// - Abstraction & Security: Your front-end page no longer needs to know about the external jsonplaceholder URL. 
// - You could add caching, data transformation, or even hide API keys in the API route, and the page would never know the difference.

import type { APIRoute } from 'astro';
import type { User } from '../../types/user'; // Import our shared type

export const GET: APIRoute = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
      throw new Error('Failed to fetch users from external API');
    }

    const users: User[] = await res.json();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
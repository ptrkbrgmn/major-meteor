import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
  try {
    console.log('Fetching users via shared library function...');
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
      throw new Error('Failed to fetch users from external API');
    }
    const users: User[] = await res.json();
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}
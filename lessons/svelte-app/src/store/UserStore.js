import { writable } from 'svelte/store';

export const users = writable({ results: [] });

export const getUsers = async () => {
  const response = await window.fetch("https://randomuser.me/api?results=20");
  const userJson = await response.json();
  userJson.results = userJson.results.map(user => ({
    ...user,
    id: Math.random() * 1e17
  }));
  users.update(() => userJson);
}
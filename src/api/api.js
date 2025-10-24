export async function fetchPosts(page = 1, limit = 10) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { PostsContext } from "../contexts/PostsContext";
import API from "../services/api";

export default function Home() {
  const { posts, categories, meta, loading, fetchPosts, deletePost } = useContext(PostsContext);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts({ page, limit: meta.limit, q, category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, category]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(id);
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <section>
      <div className="flex gap-4 items-center mb-4">
        <h1 className="text-3xl font-bold flex-1">Latest Posts</h1>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder="Search posts..."
          className="border p-2 rounded w-64"
        />
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="border p-2 rounded">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {loading ? <div>Loading...</div> : (
        posts.length === 0 ? <p className="text-gray-500">No posts.</p> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="relative">
                <PostCard post={post} />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* basic pagination */}
      <div className="mt-6 flex justify-center items-center gap-3">
        <button onClick={() => setPage((p) => Math.max(1, p-1))} disabled={meta.page <= 1} className="px-3 py-1 border rounded">Prev</button>
        <span>Page {meta.page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </section>
  );
}

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../contexts/PostsContext";

export default function CreatePost() {
  const { createPost, categories, fetchCategories } = useContext(PostsContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // make sure categories exist
  if (!categories.length) fetchCategories();

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!content.trim()) return "Content is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    if (category) form.append("category", category);
    if (file) form.append("featuredImage", file);

    setSaving(true);
    try {
      const created = await createPost(form);
      navigate(`/post/${created._id}`);
    } catch (err) {
      alert("Create failed: " + (err.response?.data?.error || err.message));
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded mb-3" />
      <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} className="w-full border p-2 rounded mb-3" rows="8" />
      <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border p-2 rounded mb-3">
        <option value="">-- choose category --</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} className="mb-4" />
      <button disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">{saving ? "Saving..." : "Publish"}</button>
    </form>
  );
}

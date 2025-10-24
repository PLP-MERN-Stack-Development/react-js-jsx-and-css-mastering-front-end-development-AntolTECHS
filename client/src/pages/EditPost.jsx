import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostsContext } from "../contexts/PostsContext";
import API from "../services/api";

export default function EditPost() {
  const { id } = useParams();
  const { updatePost, categories, fetchCategories } = useContext(PostsContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    API.get(`/posts/${id}`).then(res => {
      const p = res.data;
      setTitle(p.title); setContent(p.content);
      setCategory(p.category?._id ?? "");
      setLoading(false);
    }).catch(err => {
      console.error(err); setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    if (category) form.append("category", category);
    if (file) form.append("featuredImage", file);

    try {
      await updatePost(id, form);
      navigate(`/post/${id}`);
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded mb-3" />
      <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} className="w-full border p-2 rounded mb-3" rows="8" />
      <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border p-2 rounded mb-3">
        <option value="">-- choose category --</option>
        {categories.map(c => <option key={c._id} value={c._1d}>{c.name}</option>)}
      </select>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} className="mb-4" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    if (file) formData.append("image", file); // must match backend

    try {
      setLoading(true);
      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Create failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 w-full h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">-- choose category --</option>
          <option value="tech">Tech</option>
          <option value="life">Life</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { PostsContext } from "../contexts/PostsContext";

export default function PostDetail() {
  const { id } = useParams();
  const { fetchPosts } = useContext(PostsContext);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
      // try comments endpoint
      const cm = await API.get(`/posts/${id}/comments`).then(r => r.data).catch(() => []);
      setComments(cm);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await API.post(`/posts/${id}/comments`, { text: commentText });
      setComments((c) => [res.data, ...c]);
      setCommentText("");
    } catch (err) {
      alert("Comment failed: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{post.content}</p>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Comments</h3>
        <form onSubmit={submitComment} className="mb-4">
          <textarea value={commentText} onChange={(e)=>setCommentText(e.target.value)} className="w-full border p-2 rounded mb-2" rows="3" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Add comment</button>
        </form>

        {comments.length === 0 ? <p className="text-gray-500">No comments yet</p> : (
          <ul className="space-y-3">
            {comments.map(c => (
              <li key={c._id} className="border p-3 rounded">
                <div className="text-sm text-gray-600 mb-2">{new Date(c.createdAt).toLocaleString()}</div>
                <div>{c.text}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to={`/edit/${post._id}`} className="bg-green-600 text-white px-4 py-2 rounded">Edit Post</Link>
    </div>
  );
}

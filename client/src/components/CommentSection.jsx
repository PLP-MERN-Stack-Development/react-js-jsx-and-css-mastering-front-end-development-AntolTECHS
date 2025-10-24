import { useState, useEffect } from "react";
import API from "../api/api"; // your axios instance

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/posts/${postId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await API.post(`/posts/${postId}/comments`, { text });
      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="mt-3 border-t border-gray-300 pt-2">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-blue-500 hover:underline"
      >
        💬 {showComments ? "Hide" : "Show"} Comments ({comments.length})
      </button>

      {showComments && (
        <div className="mt-2">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((c) => (
                <li
                  key={c._id}
                  className="bg-gray-100 rounded-lg p-2 text-sm shadow-sm"
                >
                  <strong>{c.user?.username || "Anonymous"}:</strong> {c.text}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-md px-2 py-1 text-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

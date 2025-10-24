import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { PostsContext } from "../contexts/PostsContext";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { fetchPosts } = useContext(PostsContext);

  // 🔄 Fetch comments when expanded
  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  // ✅ Fetch comments for the post
  const fetchComments = async () => {
    try {
      const res = await API.get(`/posts/${post._id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // ✅ Add a new comment (and update count immediately)
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await API.post(`/posts/${post._id}/comments`, { text });
      // Update comment list and count immediately
      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // 🏷 Handle category click — filter posts
  const handleCategoryClick = () => {
    const categoryId = post.category?._id || post.category;
    fetchPosts({ category: categoryId });
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* 🖼 Featured Image */}
      {post.featuredImage && (
        <div className="w-full h-40 overflow-hidden">
          <img
            src={`http://localhost:5000${post.featuredImage}`}
            alt={post.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
      )}

      <div className="p-4">
        {/* 🏷 Category Tag */}
        {post.category && (
          <div className="mb-2">
            <button
              onClick={handleCategoryClick}
              className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full hover:bg-blue-200 transition"
            >
              {post.category.name || post.category}
            </button>
          </div>
        )}

        {/* 📝 Post Info */}
        <h2 className="text-lg font-semibold mb-1 truncate">{post.title}</h2>
        <p className="text-gray-600 line-clamp-3 mb-3 text-sm">
          {post.content}
        </p>

        {/* ✏️ Update Button */}
        <div className="flex justify-end">
          <Link
            to={`/edit/${post._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            Update
          </Link>
        </div>

        {/* 💬 Comments Section */}
        <div className="mt-4 border-t pt-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            💬 {showComments ? "Hide" : "Show"} Comments ({comments.length})
          </button>

          {showComments && (
            <div className="mt-3 space-y-3">
              {/* Existing comments */}
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-100 p-2 rounded-md text-sm"
                  >
                    <strong>{comment.user?.username || "Anonymous"}:</strong>{" "}
                    {comment.text}
                  </div>
                ))
              )}

              {/* Add new comment */}
              <form onSubmit={handleAddComment} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                >
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

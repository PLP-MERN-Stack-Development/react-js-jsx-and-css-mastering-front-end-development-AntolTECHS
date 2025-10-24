import { createContext, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "./AuthContext";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 6, total: 0 });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch posts (supports pagination + filters)
  const fetchPosts = async ({
    page = 1,
    limit = 6,
    q = "",
    category = "",
  } = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page, limit, q, category });
      const res = await API.get(`/posts?${params.toString()}`);

      const data = res.data;
      const postList =
        Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
          ? data.posts
          : Array.isArray(data.data)
          ? data.data
          : [];

      setPosts(postList);
      setMeta({
        page,
        limit,
        total: data.total || postList.length || 0,
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  // ✅ Create a new post (multipart/form-data)
  const createPost = async (formData) => {
    if (!user || !user.token) throw new Error("You must be logged in to create a post.");

    try {
      setLoading(true);
      const res = await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh posts list (optional)
      await fetchPosts();

      return res.data;
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update a post
  const updatePost = async (id, formData) => {
    if (!user || !user.token) throw new Error("You must be logged in to update a post.");

    try {
      setLoading(true);
      const res = await API.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchPosts();
      return res.data;
    } catch (err) {
      console.error("Error updating post:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a post
  const deletePost = async (id) => {
    if (!user || !user.token) throw new Error("You must be logged in to delete a post.");

    try {
      setLoading(true);
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        categories,
        meta,
        loading,
        fetchPosts,
        fetchCategories,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

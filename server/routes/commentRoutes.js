import express from "express";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

// GET /api/posts/:postId/comments
router.get("/:postId/comments", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
  res.json(comments);
});

// POST /api/posts/:postId/comments
router.post("/:postId/comments", protect, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Comment text required" });
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const comment = await Comment.create({
    post: post._id,
    user: req.user._id,
    name: req.user.name,
    text,
  });
  res.status(201).json(comment);
});

export default router;

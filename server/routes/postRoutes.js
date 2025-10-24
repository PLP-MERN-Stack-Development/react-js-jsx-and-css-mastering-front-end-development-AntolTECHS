import express from "express";
import multer from "multer";
import Post from "../models/postModel.js";
import Category from "../models/categoryModel.js";
import { protect } from "../middleware/authMiddleware.js";
import Comment from "../models/commentModel.js";

const router = express.Router();

// multer config - store in uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`);
  },
});
const upload = multer({ storage });

// GET /api/posts?limit=10&page=1&q=search&category=catId
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const q = req.query.q ? req.query.q.trim() : "";
  const category = req.query.category || "";

  const filter = {};
  if (q) filter.$or = [
    { title: { $regex: q, $options: "i" } },
    { content: { $regex: q, $options: "i" } },
  ];
  if (category) filter.category = category;

  const total = await Post.countDocuments(filter);
  const posts = await Post.find(filter)
    .populate("category")
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ data: posts, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
});

// GET /api/posts/:id
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("category").populate("author", "name email");
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// POST /api/posts  (protected)
router.post("/", protect, upload.single("featuredImage"), async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and content required" });

  // validate category if provided
  let cat = null;
  if (category) {
    cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ error: "Invalid category" });
  }

  const featuredImage = req.file ? `/uploads/${req.file.filename}` : undefined;
  const post = await Post.create({
    title, content, category: cat?._id, featuredImage, author: req.user._id
  });

  res.status(201).json(post);
});

// PUT /api/posts/:id (protected)
router.put("/:id", protect, upload.single("featuredImage"), async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  // optional: only author can update
  if (post.author && post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Not authorized to edit this post" });
  }

  const updates = {};
  if (req.body.title) updates.title = req.body.title;
  if (req.body.content) updates.content = req.body.content;
  if (req.body.category) updates.category = req.body.category;
  if (req.file) updates.featuredImage = `/uploads/${req.file.filename}`;

  const updated = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(updated);
});

// DELETE /api/posts/:id (protected)
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  // only author can delete
  if (post.author && post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Not authorized to delete this post" });
  }

  await Post.findByIdAndDelete(req.params.id);
  // optionally delete comments
  await Comment.deleteMany({ post: req.params.id });

  res.json({ message: "Deleted" });
});

export default router;

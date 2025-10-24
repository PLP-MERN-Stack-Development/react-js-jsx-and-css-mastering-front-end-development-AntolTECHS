import Post from "../models/Post.js";

// Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("category");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Get single post
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("category");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Create post
export const createPost = async (req, res, next) => {
  try {
    const { title, content, category, image } = req.body;
    const newPost = await Post.create({ title, content, category, image });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// Update post
export const updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

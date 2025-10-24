import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default router;

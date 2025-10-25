import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false },
  featuredImage: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);

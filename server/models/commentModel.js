import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  name: { type: String }, // optional name for anonymous/guest
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);

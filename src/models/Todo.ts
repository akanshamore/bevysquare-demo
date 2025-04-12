import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

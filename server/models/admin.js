import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    banner: String,
    categories: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);

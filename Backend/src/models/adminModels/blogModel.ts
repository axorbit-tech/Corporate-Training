import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  image: string;
  status: "active" | "inactive"
  createdAt?: Date;
  updatedAt?: Date;
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;

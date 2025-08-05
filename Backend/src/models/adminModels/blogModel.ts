import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
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
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;

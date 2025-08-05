import mongoose, { Document } from "mongoose";

export interface ITestimonials extends Document {
  user: string;
  role: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const testimonialSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Testimonials = mongoose.model<ITestimonials>("Testimonials", testimonialSchema);

export default Testimonials;

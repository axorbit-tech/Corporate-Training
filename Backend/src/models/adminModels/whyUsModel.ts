import mongoose, { Document } from "mongoose";

export interface IWhyUs extends Document {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const whyUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WhyUs = mongoose.model<IWhyUs>("whyUs", whyUsSchema);

export default WhyUs;

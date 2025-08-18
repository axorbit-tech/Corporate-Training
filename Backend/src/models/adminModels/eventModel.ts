import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  content: string;
  date: Date;
  images: string[];
  status: "published" | "draft";
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    images: { type: [String], required: true },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;

import mongoose, { Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema = new mongoose.Schema(
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

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;

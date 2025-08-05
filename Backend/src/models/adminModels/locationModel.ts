import mongoose, { Document } from "mongoose";

export interface ILocation extends Document {
  location: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const locationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model<ILocation>("Location", locationSchema);

export default Location;

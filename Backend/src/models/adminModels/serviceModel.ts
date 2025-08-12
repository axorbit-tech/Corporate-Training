import mongoose, { Document } from "mongoose";

export interface ISubService {
  title: string;
  content: string;
}

export interface IServices extends Document {
  title: string;
  content: string;
  image: string;
  status: string;
  subServices?: ISubService[];
  createdAt?: Date;
  updatedAt?: Date;
}

const subServiceSchema = new mongoose.Schema<ISubService>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false } // prevents extra _id for each subService
);

const serviceSchema = new mongoose.Schema<IServices>(
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
      type: String, // store image URL or path
      required: true,
    },
    status: {
      type: String,
      enum: ['active' , 'inactive'],
      default: 'inactive'
    },
    subServices: {
      type: [subServiceSchema], // array of subService objects
      default: [],
    },
  },
  { timestamps: true }
);

const Service = mongoose.model<IServices>("Service", serviceSchema);

export default Service;

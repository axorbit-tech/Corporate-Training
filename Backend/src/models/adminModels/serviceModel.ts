import mongoose, { Document } from "mongoose";

export interface ISubService {
  id: number;
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
    id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
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
      type: String,
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
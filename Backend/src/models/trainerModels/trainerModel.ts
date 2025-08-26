import mongoose, { Document } from "mongoose";

interface IService {
  title: string;
  content?: string;
}

interface ISubService {
  title: string;
  content?: string;
}

export interface ITrainer extends Document {
  name: string;
  email: string;
  phone: number;
  image: string;
  designation: string;
  website?: string;
  language: string;
  experience: number;
  company: string;
  services: IService[];
  subServices: ISubService[];
  country: string;
  state: string;
  description: string;
  status: string;
  isApproved: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Added unique constraint
    },
    phone: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false
    },
    designation: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    services: [
      {
        title: { type: String, required: true },
        _id: false // Prevent MongoDB from creating _id for subdocuments
      },
    ],
    subServices: [
      {
        title: { type: String, required: true },
        _id: false // Prevent MongoDB from creating _id for subdocuments
      },
    ],
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Trainer = mongoose.model<ITrainer>("Trainer", trainerSchema);

export default Trainer;
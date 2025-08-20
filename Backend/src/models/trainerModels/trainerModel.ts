import mongoose, { Document } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  email: string;
  phone: number;
  designation: string;
  website?: string;
  language: string;
  experience: string;
  company: string;
  services: string[];
  subServices: string[];
  country: string;
  status: "active" | "inactive";
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
    },
    phone: {
      type: Number,
      required: true,
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
    services: {
      type: [String],
      required: true,
    },
    subServices: {
      type: [String],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: 'inactive'
    },
    isApproved: {
      type : String,
      enum: ['pending', 'approved', 'rejected'] ,
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Trainer = mongoose.model<ITrainer>("Trainer", trainerSchema);

export default Trainer;

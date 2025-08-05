import mongoose, { Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;

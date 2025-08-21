import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  phone: number;
  age: number;
  gender: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

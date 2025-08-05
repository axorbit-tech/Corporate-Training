import mongoose, { Document } from "mongoose";

export interface ILanguage extends Document {
  language: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const languageSchema = new mongoose.Schema(
  {
    language: {
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

const Language = mongoose.model<ILanguage>("Language", languageSchema);

export default Language;

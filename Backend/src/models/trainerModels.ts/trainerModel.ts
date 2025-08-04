import mongoose, { Document } from 'mongoose';

export interface ITrainer extends Document {
  email: string;
  name: string;
  phone: number;
  website: string;
  location: string;
  language: string;
  experience: string;
  IdCardNo: string;
  password: string;
}

const trainerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    Number,
    required: true
  },
  website: {
    String,
    required: true
  },
  location: {
    String,
    required: true
  }
});

const Trainer = mongoose.model<ITrainer>('Trainer', trainerSchema);

export default Trainer;
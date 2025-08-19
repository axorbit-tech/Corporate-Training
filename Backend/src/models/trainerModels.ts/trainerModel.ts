import mongoose, { Document } from 'mongoose';

export interface ITrainer extends Document {
  name: string;
  email: string;
  phone: number;
  website: string;
  location: string;
  language: string;
  experience: string;
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
    required: false
  },
  location: {
    String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  }
});

const Trainer = mongoose.model<ITrainer>('Trainer', trainerSchema);

export default Trainer;
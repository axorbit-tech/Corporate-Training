import { number } from 'joi';
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  phone: number;
  age: number;
  sex: string;
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
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  sex: {
    type: String,
    required: false
  }
});

const Trainer = mongoose.model<IUser>('User', trainerSchema);

export default Trainer;
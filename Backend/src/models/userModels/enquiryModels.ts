import { number } from 'joi';
import mongoose, { Document } from 'mongoose';

export interface IEnquiry extends Document {
  userId: string;
  message: string;
  subject: string;
}

const trainerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true
  },
});

const Trainer = mongoose.model<IEnquiry>('Enquiry', trainerSchema);

export default Trainer;
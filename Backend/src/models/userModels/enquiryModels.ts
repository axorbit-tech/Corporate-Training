import { number } from 'joi';
import mongoose, { Document } from 'mongoose';

export interface IEnquiry extends Document {
  userId: string;
  message: string;
  subject: string;
}

const enquirySchema = new mongoose.Schema({
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

const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);

export default Enquiry;
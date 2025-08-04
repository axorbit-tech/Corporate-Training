import mongoose, { Document } from 'mongoose';

export interface IServices extends Document {
  title: string;
  image: string;
}

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  }
});

const Service = mongoose.model<IServices>('Service', serviceSchema);

export default Service;
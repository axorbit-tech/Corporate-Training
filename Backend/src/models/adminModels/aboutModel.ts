import mongoose, { Document } from 'mongoose';

export interface IAbout extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
  timing: string;
  about: string;
  mission: string;
  vision: string;
}

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  }
});

const About = mongoose.model<IAbout>('About', aboutSchema);

export default About;
import mongoose, { Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  service: string;
  date: Date;
  country: string;
  state : string;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;

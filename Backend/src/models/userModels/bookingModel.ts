import mongoose, { Document } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  service: string;
  date: Date;
  country: string;
  state : string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;

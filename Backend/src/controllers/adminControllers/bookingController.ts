import { Request, Response } from "express";
import BookingModel from "../../models/userModels/bookingModel";
import dayjs from "dayjs";
import { HttpStatusCode } from "../../constants/httpStatusCodes";

const getBookings = async (req: Request, res: Response) => {
  try {
    const filter = (req.query.filter as string)?.toLowerCase() || "";
    const now = dayjs();

    let query: any = {};

    if (filter === "today") {
      const startOfDay = now.startOf("day").toDate();
      const endOfDay = now.endOf("day").toDate();

      query.date = { $gte: startOfDay, $lte: endOfDay };
    } else if (filter === "upcoming") {
      const endOfToday = now.endOf("day").toDate();
      query.date = { $gt: endOfToday };
    } else if (filter === "cancelled") {
      query.status = "cancelled";
    } else if (filter === "confirmed") {
      query.status = "confirmed";
    } else if (filter === "completed") {
      query.status = "completed";
    } else if (filter === "pending") {
      query.status = "pending";
    }

    const bookings = await BookingModel.find(query)
      .populate("userId")
      .sort({ date: 1 });

    res.status(HttpStatusCode.OK).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching bookings",
    });
  }
};

const getBookingDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findById(id).populate("userId");

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching bookings",
    });
  }
};

const BookingController = {
  getBookings,
  getBookingDetails,
};

export default BookingController;

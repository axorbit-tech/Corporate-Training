import { Request, Response } from "express";
import BookingModel from "../../models/userModels/bookingModel";
import dayjs from "dayjs";
import { HttpStatusCode } from "../../constants/httpStatusCodes";

const getBookings = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
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
    }

    const bookings = await BookingModel.find(query).sort({ date: 1 });

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

const BookingController = {
    getBookings
}

export default BookingController;

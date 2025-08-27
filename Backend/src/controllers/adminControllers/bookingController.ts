import { Request, Response } from "express";
import BookingModel from "../../models/userModels/bookingModel";
import trainerModel from "../../models/trainerModels/trainerModel";
import dayjs from "dayjs";
import { HttpStatusCode } from "../../constants/httpStatusCodes";

const getBookings = async (req: Request, res: Response) => {
  try {
    const filter = (req.query.filter as string)?.toLowerCase() || "";
    const now = dayjs();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // calculate how many to skip
    const skip = (page - 1) * limit;

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
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BookingModel.countDocuments(query);

    res.status(HttpStatusCode.OK).json({
      success: true,
      count: bookings.length,
      data: bookings,
      pagination: {
        page,
        limit,
        total ,
        pages: Math.ceil(total / limit),
      },
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

const updateBookingStatus = async (req: Request, res: Response) => {
  try {

    const { id, trainerId, status } = req.body;
    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Booking not found",
      });
    }

    if (trainerId && trainerId.trim() !== "") {
      const trainer = await trainerModel.findById(trainerId);

      if (!trainer) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          error: "Trainer not found",
        });
      }
    }
    booking.status = status;
    booking.trainerId = trainerId;
    await booking.save();
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating booking status",
    });
  }
}

const getUserBookings = async (req: Request, res: Response) => {
  try {

    const {id} = req.params

    console.log(req.params, "reqqq pramrarmamrm")

    if (!id) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    const bookings = await BookingModel.find({userId: id});

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: bookings
    })
    
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching user bookings",
    });
  }
}

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findByIdAndDelete(id);

    if (!booking) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting booking",
    });
  }
};

const BookingController = {
  getBookings,
  getBookingDetails,
  updateBookingStatus,
  deleteBooking,
  getUserBookings
};

export default BookingController;

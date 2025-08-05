import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import eventModel from "../../models/adminModels/eventModel";
import { eventSchema } from "../../validations/adminValidation/eventValidation";

// ✅ Edit Service
const addEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = eventSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { title, content } = req.body;

    const isEventExist = await eventModel.findOne({ title });

    if (isEventExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Event already exists!",
      });
      return;
    }

    const newEvent = new eventModel({ title, content });
    await newEvent.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Event added successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error adding Event" });
  }
};

// ✅ Edit Service
const editEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { error } = eventSchema.validate({ title, content });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await eventModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Event not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Event updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating Event",
    });
  }
};

// ✅ Delete Service
const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await eventModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Event not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting Event",
    });
  }
};

const serviceController = {
  addEvent,
  editEvent,
  deleteEvent
};

export default serviceController;

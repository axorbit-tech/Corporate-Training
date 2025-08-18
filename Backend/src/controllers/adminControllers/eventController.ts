import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import eventModel from "../../models/adminModels/eventModel";
import { eventSchema } from "../../validations/adminValidation/eventValidation";

// ✅ Add Event
const addEvent = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log('add event contrlloer')
    const { error } = eventSchema.validate(req.body);
    
    if (error) {
      console.log('error inside')
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }
    console.log('no error')

    const { title, content, date } = req.body;

    console.log('req.bodyyyy : ', req.body)

    const isEventExist = await eventModel.findOne({ title });

    if (isEventExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Event already exists!",
      });
      return;
    }

    if (!req.files || req.files.length === 0) {
      res.status(400).json({
        success: false,
        error: "Event images are required!",
      });
      return;
    }

    const images = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );

    const newEvent = new eventModel({
      title,
      content,
      date: new Date(date),
      images,
    });
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

// ✅ Edit Event
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

// ✅ Delete Event
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

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await eventModel.find().sort({ createdAt: -1 });

    console.log("events : ", events)

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: events,
    });
    
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error Fetching Events",
    });
  }
}

const getEventDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await eventModel.findById(id);

    if (!event) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "event not found",
      });
      return;
    }

    console.log('event : ', event)

    res.status(HttpStatusCode.OK).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching event details",
    });
  }
};

const EventController = {
  addEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  getEventDetails
};

export default EventController;

import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import eventModel from "../../models/adminModels/eventModel";
import { eventSchema } from "../../validations/adminValidation/eventValidation";

// ✅ Add Event
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


    const { title, content, date } = req.body;



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

    const { title, content, date } = req.body;

    const { error } = eventSchema.validate({ title, content, date });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const event = await eventModel.findById(id);
    if (!event) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Event not found",
      });
      return;
    }

    // Start with existing images from DB
    const updatedImages = [...(event.images || Array(5).fill(""))];

    // Handle existing image URLs from frontend
    for (let i = 0; i < 5; i++) {
      const existingImage = req.body[`existingImages[${i}]`];

      // If user explicitly provides an existing image (keep as is)
      if (existingImage) {
        updatedImages[i] = existingImage;
      }

      // If user uploaded a new image for this position
      if (req.files && !Array.isArray(req.files)) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        const fileKey = `images[${i}]`;
        const fileArray = files[fileKey];
        if (fileArray && fileArray.length > 0) {
          updatedImages[i] = fileArray[0].path;
        }
      }

      // If neither existing image nor new file → do nothing (keep old value)
    }

    // Handle newly uploaded files
    if (req.files && !Array.isArray(req.files)) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      for (let i = 0; i < 5; i++) {
        const fileKey = `images[${i}]`;
        const fileArray = files[fileKey];
        if (fileArray && fileArray.length > 0) {
          updatedImages[i] = fileArray[0].path;
        }
      }
    }

    // Update event details
    event.title = title;
    event.content = content;
    event.date = new Date(date);
    event.images = updatedImages;

    const updatedEvent = await event.save();

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
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

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const events = await eventModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await eventModel.countDocuments();

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: events,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error Fetching Events",
    });
  }
};

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

const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await eventModel.findById(id)

    if (!event) {
      res.status(404).json({ success: false, message: "Event not found" });
      return;
    }

    event.status = event.status === "draft" ? "published" : "draft";


    await event.save()

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Evennt Status Updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error Updating Status",
    });
  }
};

const EventController = {
  addEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  getEventDetails,
  updateStatus,
};

export default EventController;

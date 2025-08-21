import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import userModel from "../../models/userModels/userModel";
import EnquiryModel from "../../models/userModels/enquiryModels";
import { userSchema } from "../../validations/userValidation/userValidation";
import { bookingSchema } from "../../validations/userValidation/bookingValidations";
import { sendEmail } from "../../utils/mailService";
import serviceModel from "../../models/adminModels/serviceModel";
import blogModel from "../../models/adminModels/blogModel";
import eventModel from "../../models/adminModels/eventModel";
import bookingModel from "../../models/userModels/bookingModel";
import trainerModel from "../../models/trainerModels/trainerModel";

const today = new Date();

const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({
          success: false,
          error: error.details.map((err) => err.message),
        });
      return;
    }

    const { email, name, phone, age, sex } = value;
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ email, name, phone, age, sex });
    }

    await EnquiryModel.create({
      userId: user._id,
      message: req.body.message,
      subject: req.body.subject,
    });

    const fromMail = process.env.MAIL_FROM;

    // // send email to admin
    // sendEmail({
    //     from: fromMail,
    //     replyTo: email,
    //     to: fromMail,
    //     subject: `New contact from ${name} (${email})`,
    //     text: `Email: ${email}\nName: ${name}\nPhone: ${phone}\nAge: ${age}\nSex: ${sex}`,
    // }).catch(err => console.error(`Error sending email to admin:`, err));

    // // send email to user
    // sendEmail({
    //     from: fromMail,
    //     replyTo: fromMail,
    //     to: email,
    //     subject: "Thank you for your contact",
    //     text: `Thank you for your contact. We will get back to you soon.`,
    // }).catch(err => console.error(`Error sending email to user:`, err));

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Details added successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating user" });
  }
};

const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await serviceModel
      .find()
      .where("status")
      .equals("active")
      .sort({ createdAt: -1 });

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching services",
    });
  }
};

const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await serviceModel
      .findById(id)
      .where("status")
      .equals("active");

    if (!service) {
      console.log("Service not found");
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogModel
      .find({ status: "active" })
      .sort({ createdAt: -1 })
      .limit(9);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching blog",
    });
  }
};

const getBlogDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findOne({ _id: id, status: "active" });

    if (!blog) {
      console.error("Blog not found");
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Blog not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching blog details",
    });
  }
};

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // calculate how many to skip
    const skip = (page - 1) * limit;

    const allEvents = await eventModel
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total count (for frontend pagination UI)
    const totalEvents = await eventModel.countDocuments({
      status: "published",
    });

    const upcomingEvents = await eventModel
      .find({ status: "published", date: { $gt: today } })
      .sort({ date: 1 });

    const recentEvents = await eventModel
      .find({ status: "published", date: { $lt: today } })
      .sort({ date: -1 })
      .limit(6);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: {
        allEvents,
        upcomingEvents,
        recentEvents,
      },
      pagination: {
        total: totalEvents,
        page,
        pages: Math.ceil(totalEvents / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching Events",
    });
  }
};

const getEventDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await eventModel.findOne({ _id: id, status: "published" });

    if (!event) {
      console.error("Event not found");
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Blog not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: event,

    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching event details",
    });
  }
};

const createBooking = async (req: Request, res: Response) => {
  try {
    const { error, value } = bookingSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({
          success: false,
          error: error.details.map((err) => err.message),
        });
      return;
    }

    const { email, name, phone, age, gender } = value;
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ email, name, phone, age, gender });
    }

    await bookingModel.create({
      userId: user._id,
      service: req.body.service,
      date: req.body.date,
      country: req.body.country,
      state: req.body.state,
    });

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Details added successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating user" });
  }
};

const getTrainers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;

    // calculate how many to skip
    const skip = (page - 1) * limit;

    const trainers = await trainerModel.find({
      isApproved: "approved",
      status: "active",
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalTrainers = await trainerModel.countDocuments({
      isApproved: "approved",
      status: "active",
    });

    if (!trainers) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Trainers not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: trainers,
      pagination: {
        total: totalTrainers,
        page,
        pages: Math.ceil(totalTrainers / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating Trainer" });
  }
};

const userController = {
  createEnquiry,
  getAllServices,
  getServiceById,
  getAllBlogs,
  getBlogDetails,
  getAllEvents,
  getEventDetails,
  createBooking,
  getTrainers,
};

export default userController;

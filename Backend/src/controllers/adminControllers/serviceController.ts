import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import serviceModel from "../../models/adminModels/serviceModel";
import { serviceValidationSchema } from "../../validations/adminValidation/serviceValidation";

// ✅ Add Service
const addService = async (req: Request, res: Response): Promise<void> => {
  try {

    if (req.body.subservices) {
      try {
        req.body.subservices = JSON.parse(req.body.subservices);
      } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: "Invalid subservices format",
        });
        return
      }
    }

    const {title, content, subservices } = req.body

    const { error } = serviceValidationSchema.validate({title, content});

    console.log("eroororor : ", error)

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }


    console.log(subservices,"subServicesssss")

    if (!req.file) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: "Service image is required!",
      }); 
      return;
    }

    console.log('finee')

    const isServiceExist = await serviceModel.findOne({ title });

    if (isServiceExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Service already exists!",
      });
      return;
    }

    // Check if image was uploaded and get the Cloudinary URL
    const imageUrl = req.file ? req.file.path : undefined;

    const newService = new serviceModel({
      title,
      content,
      image: imageUrl, // Add the image URL from Cloudinary
      subServices: subservices || [], // Add subServices array (empty array if not provided)
    });
    await newService.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Service added successfully",
      data: newService,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error adding service" });
  }
};

const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await serviceModel.find().sort({ createdAt: -1 });

    console.log("servicessss : ", services)

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


// ✅ Edit Service
const editService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { error } = serviceValidationSchema.validate({ title, content });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await serviceModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Service not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Service updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating Service",
    });
  }
};

// ✅ Delete Service
const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await serviceModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Service not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting Service",
    });
  }
};

const serviceController = {
  addService,
  editService,
  deleteService,
  getAllServices
};

export default serviceController;

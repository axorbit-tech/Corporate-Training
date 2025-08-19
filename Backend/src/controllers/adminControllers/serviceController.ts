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

    console.log("error: ", error)

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }


    

    if (!req.file) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: "Service image is required!",
      }); 
      return;
    }

    

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
    const service = await serviceModel.findById(id);

    if (!service) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Service not found' });
    }

    res.status(HttpStatusCode.OK).json({message: 'sucess', data: service});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Edit Service
const editService = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.subservices) {
      try {
        req.body.subservices = JSON.parse(req.body.subservices);
      } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: "Invalid subservices format",
        });
        return;
      }
    }

    const { title, content, subservices } = req.body;
    const { id } = req.params;

    const { error } = serviceValidationSchema.validate({ title, content });

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    // Check if service exists
    const existingService = await serviceModel.findById(id);
    if (!existingService) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Service not found",
      });
      return;
    }

    // Prepare update object
    const updateData: any = {
      title,
      content,
      subServices: subservices || [],
    };

    // If new image is uploaded, update image URL
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary or multer destination path
    }

    // Update service
    const updatedService = await serviceModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Error updating service",
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


const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const service = await serviceModel.findById(id)

    if (!service) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }

    service.status = service.status == "active" ? "inactive" : "active"

    await service.save()

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Service Updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error Updating Status",
    });
  }
};

const serviceController = {
  addService,
  editService,
  getServiceById,
  deleteService,
  getAllServices,
  updateStatus
};

export default serviceController;

import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import serviceModel from "../../models/adminModels/serviceModel";
import { serviceSchema } from "../../validations/adminValidation/serviceValidation";

// ✅ Add Service
const addService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = serviceSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { title, content } = req.body;

    const isServiceExist = await serviceModel.findOne({ title });

    if (isServiceExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Service already exists!",
      });
      return;
    }

    const newService = new serviceModel({ title, content });
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

// ✅ Edit Service
const editService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { error } = serviceSchema.validate({ title, content });
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
  deleteService
};

export default serviceController;

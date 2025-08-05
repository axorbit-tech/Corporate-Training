import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import serviceModel from "../../models/adminModels/serviceModel";
import { serviceSchema } from "../../validations/adminValidation/serviceValidation";

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

const serviceController = {
  addService,
};

export default serviceController;

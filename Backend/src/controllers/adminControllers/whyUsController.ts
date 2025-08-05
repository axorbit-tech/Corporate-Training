import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import whyUsModel from "../../models/adminModels/whyUsModel";
import { whyUsSchema } from "../../validations/adminValidation/whyUsValidation";

// ✅ Edit WhyUs
const addWhyUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = whyUsSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { title, content } = req.body;

    const isExist = await whyUsModel.findOne({ title });

    if (isExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Data already exists!",
      });
      return;
    }

    const newData = new whyUsModel({ title, content });
    await newData.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Data added successfully",
      data: newData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error adding Data" });
  }
};

// ✅ Edit WhyUs
const editWhyUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { error } = whyUsSchema.validate({ title, content });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await whyUsModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Data not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Data updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating Data",
    });
  }
};

// ✅ Delete WhyUs
const deleteWhyUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await whyUsModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Data not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting Data",
    });
  }
};

const serviceController = {
  addWhyUs,
  editWhyUs,
  deleteWhyUs
};

export default serviceController;

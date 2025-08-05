import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import testimonialModel from "../../models/adminModels/testimonialModel";
import { testimonialSchema } from "../../validations/adminValidation/testimonialSchema";

// ✅Add Testimonial
const addTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = testimonialSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { user, role, content } = req.body;

    const isExist = await testimonialModel.findOne({ user });

    if (isExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Testimonial already exists!",
      });
      return;
    }

    const newTestimonial = new testimonialModel({ user, role, content });
    await newTestimonial.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Testimonial added successfully",
      data: newTestimonial,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error adding Testimonial" });
  }
};

// ✅ Edit Testimonial
const editTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { user, role, content } = req.body;

    const { error } = testimonialSchema.validate({ user, role, content });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await testimonialModel.findByIdAndUpdate(
      id,
      { user, role, content },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Testimonial not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating Testimonial",
    });
  }
};

// ✅ Delete Service
const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await testimonialModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "testimonials not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "testimonials deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting testimonials",
    });
  }
};

const serviceController = {
  addTestimonial,
  editTestimonial,
  deleteTestimonial
};

export default serviceController;

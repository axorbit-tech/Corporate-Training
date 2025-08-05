import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import blogModel from "../../models/adminModels/blogModel";
import { blogSchema } from "../../validations/adminValidation/blogValidation";

// ✅ Edit Blog
const addBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = blogSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { title, content } = req.body;

    const isEventExist = await blogModel.findOne({ title });

    if (isEventExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Blog already exists!",
      });
      return;
    }

    const newEvent = new blogModel({ title, content });
    await newEvent.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Blog added successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error adding Blog" });
  }
};

// ✅ Edit Blog
const editBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { error } = blogSchema.validate({ title, content });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await blogModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Blog not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Blog updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating Blog",
    });
  }
};

// ✅ Delete Blog
const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await blogModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Blog not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting Event",
    });
  }
};

const blogController = {
  addBlog,
  editBlog,
  deleteBlog
};

export default blogController;

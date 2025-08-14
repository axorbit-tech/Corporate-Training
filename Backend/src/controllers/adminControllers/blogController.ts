import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import blogModel from "../../models/adminModels/blogModel";
import { blogSchema } from "../../validations/adminValidation/blogValidation";

// ✅ Add Blog
const addBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    // Validate request body using your Joi schema
    const { error } = blogSchema.validate({ title, content });

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    // Check if image exists
    if (!req.file) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: "Blog image is required!",
      });
      return;
    }

    // Check if blog already exists
    const isBlogExist = await blogModel.findOne({ title });
    if (isBlogExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Blog already exists!",
      });
      return;
    }

    // Get image path (Cloudinary or local storage)
    const imageUrl = req.file ? req.file.path : undefined;

    // Create new blog document
    const newBlog = new blogModel({
      title,
      content,
      image: imageUrl,
    });

    await newBlog.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Blog added successfully",
      data: newBlog,
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

const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });

    console.log("servicessss : ", blogs)

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: blogs,
    });
    
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting Event",
    });
  }
}

const getBlogDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    console.log('iddd: ', id)

    const blog = await blogModel.findById(id);

    if (!blog) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Blog not found",
      });
      return;
    }

    console.log('blog : ', blog)

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


const blogController = {
  addBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getBlogDetails
};

export default blogController;

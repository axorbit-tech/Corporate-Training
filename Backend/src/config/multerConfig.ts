import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "consultancy-app",
    resource_type: "image",
    public_id: `${Date.now()}-${file.originalname}`,
    transformation: [
      { width: 1000, height: 1000, crop: "limit" }
    ]
  }),
});

const upload = multer({ storage });

export default upload;
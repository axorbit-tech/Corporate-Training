import express from "express";
import userController from "../controllers/userController/userController";


const router = express.Router();

router.post('/enquiry', userController.createEnquiry);
router.get('/service', userController.getAllServices);
router.get('/service/:id', userController.getServiceById);
router.get('/blog', userController.getAllBlogs);
router.get('/blog/:id', userController.getBlogDetails);
router.get('/event', userController.getAllEvents);
router.get('/event/:id', userController.getEventDetails);

export default router;

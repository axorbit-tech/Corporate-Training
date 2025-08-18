import express from "express";
import userController from "../controllers/userController/userController";


const router = express.Router();

router.post('/enquiry', userController.createEnquiry);
router.get('/service', userController.getAllServices);
router.get('/service/:id', userController.getServiceById);

export default router;

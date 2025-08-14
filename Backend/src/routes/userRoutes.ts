import express from "express";
import userController from "../controllers/userController/userController";


const router = express.Router();

router.post('/enquiry', userController.createEnquiry);

export default router;

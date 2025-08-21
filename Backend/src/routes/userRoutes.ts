import express from "express";
import userController from "../controllers/userController/userController";
import trainerController from "../controllers/adminControllers/tainerController";
import upload from "../config/multerConfig";


const router = express.Router();

// ========================================= Enquiry =========================================

router.post('/enquiry', userController.createEnquiry);

// ========================================= Services =========================================

router.get('/service', userController.getAllServices);
router.get('/service/:id', userController.getServiceById);

// ========================================= Blogs ===========================================

router.get('/blog', userController.getAllBlogs);
router.get('/blog/:id', userController.getBlogDetails);

// ========================================= Events ===========================================

router.get('/event', userController.getAllEvents);
router.get('/event/:id', userController.getEventDetails);


// ========================================= Booking ===========================================

router.post('/booking', userController.createBooking);


// ========================================= Trainers ===========================================

router.post('/trainer-registration', upload.single('image'), trainerController.trainerRegistration);
router.get('/trainers', userController.getTrainers);


export default router;

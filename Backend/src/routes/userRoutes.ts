import express from "express";
import userController from "../controllers/userController/userController";
import trainerController from "../controllers/adminControllers/tainerController";


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


// ========================================= Trainer Registration ===========================================

router.post('/trainer-registration', trainerController.trainerRegistration);


export default router;

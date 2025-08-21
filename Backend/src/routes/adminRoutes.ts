import express from "express";
import adminController from "../controllers/adminControllers/authController";
import languageController from "../controllers/adminControllers/languageController";
import locationController from "../controllers/adminControllers/locationController";
import serviceController from "../controllers/adminControllers/serviceController";
import eventController from "../controllers/adminControllers/eventController";
import blogController from "../controllers/adminControllers/blogController";
import whyUsController from "../controllers/adminControllers/whyUsController";
import testimonialController from "../controllers/adminControllers/testimonialController";
import upload from "../config/multerConfig";
import authMiddleware from "../middlewares/authMiddleware";
import clientController from "../controllers/adminControllers/clientController";
import trainerController from "../controllers/adminControllers/tainerController";
import bookingController from "../controllers/adminControllers/bookingController";
import dashboardController from "../controllers/adminControllers/dashboardController";
const router = express.Router();



// authentication routes
router.post('/login', adminController.login)
// router.post('/signup', adminController.signupAdmin)

// Protected routes (auth applies to everything below this line)
router.use(authMiddleware);

// ========================================= Language =========================================

// /language (create + get all)
router
  .route('/language')
  .post(languageController.addLanguage)

// /language/:id (get details + update + delete)
router
  .route('/language/:id')
  .put(languageController.editLanguage)
  .delete(languageController.deleteLanguage)


// ========================================= Location =========================================

// /location (create + get all)
router
  .route('/location')
  .post(locationController.addLocation)

// /location/:id (get details + update + delete)
router
  .route('/location/:id')
  .put(locationController.editLocation)
  .delete(locationController.deleteLocation)


// ========================================= Service =========================================

// /service (create + get all)
router
  .route("/service")
  .post(upload.single("image"), serviceController.addService)
  .get(serviceController.getAllServices);

// /service/:id (get details + update + delete + status)
router
  .route("/service/:id")
  .get(serviceController.getServiceById)
  .put(upload.single("image"), serviceController.editService)
  .delete(serviceController.deleteService)
  .patch(serviceController.updateStatus);


// ========================================= Event =========================================

// /event (create + get all)
router
  .route("/event")
  .post(upload.array("images"), eventController.addEvent)
  .get(eventController.getAllEvents);

// /event/:id (get details + update + delete + status)
router
  .route("/event/:id")
  .get(eventController.getEventDetails)
  .put(
    upload.fields([
      { name: "images[0]", maxCount: 1 },
      { name: "images[1]", maxCount: 1 },
      { name: "images[2]", maxCount: 1 },
      { name: "images[3]", maxCount: 1 },
      { name: "images[4]", maxCount: 1 },
    ]),
    eventController.editEvent
  )
  .delete(eventController.deleteEvent)
  .patch(eventController.updateStatus);

// ========================================= Blog =========================================  

// /blog (create + get all)
router
  .route("/blog")
  .post(upload.single("image"), blogController.addBlog)
  .get(blogController.getAllBlogs);

// /blog/:id (get details + update + delete + status)
router
  .route("/blog/:id")
  .get(blogController.getBlogDetails)
  .put(upload.single("image"), blogController.editBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.updateStatus);


// ========================================= Why Us =========================================

// /why-us (create)
router
  .route("/why-us")
  .post(whyUsController.addWhyUs);

// /why-us/:id (update + delete)
router
  .route("/why-us/:id")
  .put(whyUsController.editWhyUs)
  .delete(whyUsController.deleteWhyUs);

// ========================================= Testimonials =========================================

// /testimonials (create)
router
  .route("/testimonials")
  .post(testimonialController.addTestimonial);

// /testimonials/:id (update + delete)
router
  .route("/testimonials/:id")
  .put(testimonialController.editTestimonial)
  .delete(testimonialController.deleteTestimonial);


// ========================================= Client ==============================================
router.get('/client', clientController.getAllClients)


// ========================================= Trainer ==============================================
router.get('/trainer', trainerController.getTrainers)

router.get('/trainer/:id', trainerController.getTrainerDetails)

router.patch('/trainer/:id', trainerController.updateTrainerStatus)

router.get('/requests', trainerController.getRequests)


// ========================================= Booking ==============================================

router.get('/booking', bookingController.getBookings)

router.get('/booking/:id',bookingController.getBookingDetails)

router.patch('/booking',bookingController.updateBookingStatus)

// ========================================= Dashboard ==============================================

router.get('/dashboard', dashboardController.getDashboardDetails)

export default router;

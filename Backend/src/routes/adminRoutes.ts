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
const router = express.Router();



// authentication routes
router.post('/login', adminController.login)
// router.post('/signup', adminController.signupAdmin)

// Protected routes (auth applies to everything below this line)
router.use(authMiddleware);


// add, edit, delete languages routes
router.post('/language', languageController.addLanguage)
router.put('/language/:id', languageController.editLanguage)
router.delete('/language/:id', languageController.deleteLanguage)

// add, edit, delete locations routes
router.post('/location', locationController.addLocation)
router.put('/location/:id', locationController.editLocation)
router.delete('/location/:id', locationController.deleteLocation)

// add, edit, delete services routes
router.post('/service', upload.single('image'), serviceController.addService)
router.put('/service/:id', upload.single('image'), serviceController.editService)
router.delete('/service/:id', serviceController.deleteService)
router.get('/service', serviceController.getAllServices)
router.get('/service/:id', serviceController.getServiceById);
router.patch('/service/:id', serviceController.updateStatus);

// add, edit, delete event routes
router.post('/event', upload.array('images'), eventController.addEvent)
router.get('/event', eventController.getAllEvents)
router.get('/event/:id', eventController.getEventDetails)
router.put('/event/:id', upload.fields([
    { name: 'images[0]', maxCount: 1 },
    { name: 'images[1]', maxCount: 1 },
    { name: 'images[2]', maxCount: 1 },
    { name: 'images[3]', maxCount: 1 },
    { name: 'images[4]', maxCount: 1 }
  ]), eventController.editEvent)
router.delete('/event/:id', eventController.deleteEvent)

// add, edit, delete blog routes
router.post('/blog', upload.single('image'), blogController.addBlog)
router.get('/blog', blogController.getAllBlogs)
router.get('/blog/:id', blogController.getBlogDetails);
router.put('/blog/:id', upload.single('image'), blogController.editBlog)
router.delete('/blog/:id', blogController.deleteBlog)

// add, edit, delete whyUs routes
router.post('/why-us', whyUsController.addWhyUs)
router.put('/why-us/:id', whyUsController.editWhyUs)
router.delete('/why-us/:id', whyUsController.deleteWhyUs)

// add, edit, delete testimonials routes
router.post('/testimonials', testimonialController.addTestimonial)
router.put('/testimonials/:id', testimonialController.editTestimonial)
router.delete('/testimonials/:id', testimonialController.deleteTestimonial)

router.get('/client', clientController.getAllClients)

export default router;

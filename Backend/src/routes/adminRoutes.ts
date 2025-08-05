import express from "express";
import adminController from "../controllers/adminControllers/authController";
import languageController from "../controllers/adminControllers/languageController";
import locationController from "../controllers/adminControllers/locationController";
import serviceController from "../controllers/adminControllers/serviceController";
import eventController from "../controllers/adminControllers/eventController";
import blogController from "../controllers/adminControllers/blogController";
const router = express.Router();

// authentication routes
router.post('/login', adminController.login)
// router.post('/signup', adminController.signupAdmin)

// add, edit, delete languages routes
router.post('/add-language', languageController.addLanguage)
router.put('/edit-language/:id', languageController.editLanguage)
router.delete('/delete-language/:id', languageController.deleteLanguage)

// add, edit, delete locations routes
router.post('/add-location', locationController.addLocation)
router.put('/edit-location/:id', locationController.editLocation)
router.delete('/delete-location/:id', locationController.deleteLocation)

// add, edit, delete services routes
router.post('/add-service', serviceController.addService)
router.put('/edit-service/:id', serviceController.editService)
router.delete('/delete-service/:id', serviceController.deleteService)

// add, edit, delete event routes
router.post('/add-event', eventController.addEvent)
router.put('/edit-event/:id', eventController.editEvent)
router.delete('/delete-event/:id', eventController.deleteEvent)

// add, edit, delete blog routes
router.post('/add-blog', blogController.addBlog)
router.put('/edit-blog/:id', blogController.editBlog)
router.delete('/delete-blog/:id', blogController.deleteBlog)

export default router;

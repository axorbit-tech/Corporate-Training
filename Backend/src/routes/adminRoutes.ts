import express from "express";
import adminController from "../controllers/adminControllers/authController";
import languageController from "../controllers/adminControllers/languageController";
import locationController from "../controllers/adminControllers/locationController";
import serviceController from "../controllers/adminControllers/serviceController";
const router = express.Router();

router.post('/login', adminController.login)
// router.post('/signup', adminController.signupAdmin)
router.post('/add-language', languageController.addLanguage)
router.post('/add-location', locationController.addLocation)
router.post('/add-service', serviceController.addService)

export default router;

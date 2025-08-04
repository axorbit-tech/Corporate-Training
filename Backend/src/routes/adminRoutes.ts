import express from "express";
import adminController from "../controllers/adminControllers/authController";
import languageController from "../controllers/adminControllers/languageController";
const router = express.Router();

router.post('/login', adminController.login)
// router.post('/signup', adminController.signupAdmin)
router.post('/add-language', languageController.addLanguage)

export default router;

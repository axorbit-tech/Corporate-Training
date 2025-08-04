import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import LanguageModel from "../../models/adminModels/languageModel";
import { languageSchema } from "../../validations/adminValidation/languageValidation";

const addLanguage = async (req: Request, res: Response): Promise<void> => {
  try {

    const { error } = languageSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { language, code } = req.body;

    const isLanguageExist = await LanguageModel.findOne({ language });

    if (isLanguageExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Language already exists!",
      });
      return;
    }

    const newLanguage = new LanguageModel({ language, code });
    await newLanguage.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Language added successfully",
      data: newLanguage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error logging in user" });
  }
};

const languageController = {
  addLanguage,
};

export default languageController;

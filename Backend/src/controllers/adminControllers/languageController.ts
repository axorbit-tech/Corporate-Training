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
      .json({ error: "Error adding languages" });
  }
};

const editLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { language, code } = req.body;

    const { error } = languageSchema.validate({ language, code });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await LanguageModel.findByIdAndUpdate(
      id,
      { language, code },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Language not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Language updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating language",
    });
  }
};

// ✅ Delete Language
const deleteLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await LanguageModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Language not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Language deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting language",
    });
  }
};

const languageController = {
  addLanguage,
  editLanguage,
  deleteLanguage
};

export default languageController;

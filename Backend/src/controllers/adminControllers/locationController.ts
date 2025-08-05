import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import LocationModel from "../../models/adminModels/locationModel";
import { locationSchema } from "../../validations/adminValidation/locationValidation";

const addLocation = async (req: Request, res: Response): Promise<void> => {
  try {

    const { error } = locationSchema.validate(req.body);

    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { location, code } = req.body;

    const isLocationExist = await LocationModel.findOne({ location });

    if (isLocationExist) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Location already exists!",
      });
      return;
    }

    const newLocation = new LocationModel({ location, code });
    await newLocation.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Location added successfully",
      data: newLocation,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error adding location" });
  }
};

const languageController = {
  addLocation,
};

export default languageController;

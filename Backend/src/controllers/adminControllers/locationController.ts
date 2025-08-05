import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import LocationModel from "../../models/adminModels/locationModel";
import { locationSchema } from "../../validations/adminValidation/locationValidation";

// ✅ add Location
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

// ✅ Edit Location
const editLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { location, code } = req.body;

    const { error } = locationSchema.validate({ location, code });
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const updated = await LocationModel.findByIdAndUpdate(
      id,
      { location, code },
      { new: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Location not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Location updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error updating Location",
    });
  }
};

// ✅ Delete Location
const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await LocationModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Location not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting Location",
    });
  }
};

const locationController = {
  addLocation,
  editLocation,
  deleteLocation,
};

export default locationController;

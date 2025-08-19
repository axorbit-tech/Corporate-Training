import { Request, Response } from "express";
import { trainerSchema } from "../../validations/trainerValidation/registerValidation";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import TrainerModel from "../../models/trainerModels/trainerModel";

const trainerRegistration = async (req: Request, res: Response) => {
  try {
    const { error } = trainerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details.map((err) => err.message),
      });
      return;
    }

    const {
      name,
      email,
      phone,
      designation,
      website,
      language,
      experience,
      company,
      selectedServices,
      selectedSubServices,
      country,
      state,
    } = req.body;
    let trainer = await TrainerModel.findOne({ email });
    if (!trainer) {
      trainer = await TrainerModel.create({
        email,
        name,
        phone,
        designation,
        website,
        language,
        experience,
        company,
        services: selectedServices,
        subServices : selectedSubServices,
        country,
        state,
      });
    } else {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Trainer already exists!",
      });
      return;
    }

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Trainer created successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating Trainer" });
  }
};


const trainerController = {
    trainerRegistration
}

export default trainerController
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

    console.log(req.body.description, " descccc 12345");

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
      description,
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
        subServices: selectedSubServices,
        country,
        state,
        description,
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

const getTrainers = async (req: Request, res: Response) => {
  try {
    const trainers = await TrainerModel.aggregate([
      { $match: { isApproved: "approved" } },
      { $addFields: { randomSort: { $rand: {} } } },
      { $sort: { randomSort: 1 } },
    ]);
    console.log(trainers, "trainersssss");

    if (!trainers) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Trainers not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: trainers,
    });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating Trainer" });
  }
};

const trainerController = {
  trainerRegistration,
  getTrainers,
};

export default trainerController;

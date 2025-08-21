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

    // Check if trainer already exists
    let trainer = await TrainerModel.findOne({ email });

    if (trainer) {
      res.status(HttpStatusCode.CONFLICT).json({
        success: false,
        error: "Trainer already exists!",
      });
      return;
    }

    // Transform selectedServices array of strings to array of objects
    const servicesArray = selectedServices?.map((serviceTitle: string) => ({
      title: serviceTitle
    })) || [];

    // Transform selectedSubServices array of strings to array of objects
    const subServicesArray = selectedSubServices?.map((subServiceTitle: string) => ({
      title: subServiceTitle
    })) || [];

    // Create new trainer
    trainer = await TrainerModel.create({
      email,
      name,
      phone,
      designation,
      website,
      language,
      experience,
      company,
      services: servicesArray, // Now properly formatted
      subServices: subServicesArray, // Now properly formatted
      country,
      state,
      description, // Now included
    });

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer, // Optional: return the created trainer
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
      { $sort: { createdAt: -1 } }
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

const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await TrainerModel.find({ isApproved: "pending" }).sort({
      createdAt: -1,
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating Trainer" });
  }
};

const getTrainerDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const details = await TrainerModel.findById(id)

    console.log(details, "detaillsss trainerrr")

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: details,
    });

  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Error creating Trainer" });
  }
}

const updateTrainerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;  // ✅ read from body now

    console.log(req.body, "req bodyyyyy")

    const trainer = await TrainerModel.findById(id);

    if (!trainer) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Trainer not found",
      });
    }

    if (status === 1 || status === "1") {
      trainer.isApproved = "approved";
    } else if (status === 2 || status === "2") {
      trainer.isApproved = "rejected";
    } else {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: "Invalid status value",
      });
    }

    await trainer.save();

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Trainer updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error Updating Status",
    });
  }
};



const trainerController = {
  trainerRegistration,
  getTrainers,
  getRequests,
  getTrainerDetails,
  updateTrainerStatus
};

export default trainerController;

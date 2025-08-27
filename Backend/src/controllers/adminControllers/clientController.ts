import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import userModel from "../../models/userModels/userModel";

const getAllClients = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log('hiiii')
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // calculate how many to skip
    const skip = (page - 1) * limit;

    const clients = await userModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await userModel.countDocuments();

    console.log("clients : ", clients);

    res.status(HttpStatusCode.OK).json({
      success: true,
      clients,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching Clients",
    });
  }
};

const ClientController = {
  getAllClients,
};

export default ClientController;

import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import userModel from "../../models/userModels/userModel";

const getAllClients = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log('hiiii')
    const clients = await userModel.find().sort({ createdAt: -1 });

    console.log("clients : ", clients);

    res.status(HttpStatusCode.OK).json({
      success: true,
      clients,
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

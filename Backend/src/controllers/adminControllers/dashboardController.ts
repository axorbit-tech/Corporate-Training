import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import bookingModel from "../../models/userModels/bookingModel";
import dayjs from "dayjs";
import { populate } from "dotenv";

const getDashboardDetails = async (req: Request, res: Response) => {
    try {
        const now = dayjs();

        // get todays appointment
        const todaysAppointment = await bookingModel.find({
            date: {
                $gte: now.startOf("day").toDate(),
                $lte: now.endOf("day").toDate(),
            },
        }).populate("userId", "name").populate("trainerId", "name designation").sort({ createdAt: -1 }).limit(4);

       

        // get total clients
        const result = await bookingModel.aggregate([
            { $match: { status: { $ne: "cancelled" } } },
            { $group: { _id: "$userId" } },
            { $count: "totalClients" }   
            
        ]);

        const totalClients = result[0]?.totalClients || 0;

        res.status(HttpStatusCode.OK).json({
            success: true,
            data: {
                todaysAppointment,
                totalClients,
            }
        })
    } catch (error) {
        console.log(error);

        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: "Error creating Trainer" });
    }
}


const DashboardController = { getDashboardDetails };

export default DashboardController
import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import userModel from "../../models/userModels/userModel";
import EnquiryModel from  "../../models/userModels/enquiryModels";
import { enquirySchema } from "../../validations/userValidation/enquiryValidation";
import { userSchema } from "../../validations/userValidation/userValidation";



const createEnquiry = async (req: Request, res: Response) => {
    try {
        const { error, value } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, error: error.details.map(err => err.message) });
            return;
        }

        const { email, name, phone, age, sex } = value;
        let user = await userModel.findOne({ email });
        if (!user) {
            user = await userModel.create({ email, name, phone, age, sex });
        }

        await EnquiryModel.create({ userId: user._id, ...value });

        res.status(HttpStatusCode.CREATED).json({
            success: true,
            message: "Detais added successfully", data: user
        });
    } catch (error) {
        console.error(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, error: "Error creating user" });
    }
};

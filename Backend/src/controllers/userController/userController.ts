import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import userModel from "../../models/userModels/userModel";
import EnquiryModel from "../../models/userModels/enquiryModels";
import { enquirySchema } from "../../validations/userValidation/enquiryValidation";
import { userSchema } from "../../validations/userValidation/userValidation";
import { sendEmail } from "../../utils/mailService";



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

        const fromMail = process.env.MAIL_FROM;

        // send email to admin 
        sendEmail({
            from: fromMail,
            replyTo: email,
            to: fromMail,
            subject: `New contact from ${name} (${email})`,
            text: `Email: ${email}\nName: ${name}\nPhone: ${phone}\nAge: ${age}\nSex: ${sex}`,
        }).catch(err => console.error(`Error sending email to admin:`, err));

        // send email to user 
        sendEmail({
            from: fromMail,
            replyTo: fromMail,
            to: email,
            subject: "Thank you for your contact",
            text: `Thank you for your contact. We will get back to you soon.`,
        }).catch(err => console.error(`Error sending email to user:`, err));


        res.status(HttpStatusCode.CREATED).json({
            success: true,
            message: "Details added successfully", data: user
        });
    } catch (error) {
        console.error(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, error: "Error creating user" });
    }
};

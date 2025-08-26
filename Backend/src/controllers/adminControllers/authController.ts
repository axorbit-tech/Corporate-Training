import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminModel from "../../models/adminModels/adminModel";
import { authSchema, changePassSchema } from "../../validations/adminValidation/authValidation";

dotenv.config();

// Login for Admin
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email or password required" });
      return;
    }

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ success: false, error: "admin not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ success: false, error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: admin._id, isAdmin: true },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: admin._id, isAdmin: true },
      process.env.JWT_REFRESH_SECRET || "refreshDefaultSecret",
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" } as jwt.SignOptions
    );


    // Store refresh token in secure cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // only over HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });


    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error logging in user" });
  }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {


    const {error} = changePassSchema.validate(req.body);

    if(error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message
      })
    }
    const {currentPassword, newPassword} = req.body;

    const { id } = req.params

    // Find the admin
    const admin = await adminModel.findById(id);

    if (!admin) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: "Admin not found"
      });
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);

    if (!isCurrentPasswordValid) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: "Current password is incorrect"
      });
      return;
    }

    const isSamePassword = await bcrypt.compare(newPassword, admin.password);
    if (isSamePassword) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: "New password must be different from current password"
      });
      return;
    }

    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the admin's password
    await adminModel.findByIdAndUpdate(id, {
      password: hashedNewPassword,
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Error changing password"
    });
  }
};

const adminController = {
  login,
  changePassword
};

export default adminController;


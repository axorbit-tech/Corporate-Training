import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminModel from "../../models/adminModels/adminModel";
import { authSchema, changePassSchema, forgotPassSchema } from "../../validations/adminValidation/authValidation";
import crypto from 'crypto'
import { createEmailTransporter } from "../../config/mailTransporter";

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

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error } = forgotPassSchema.validate(req.body);
    if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }

    const { email } = req.body;

    // Find admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      // Don't reveal if email exists or not for security
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "If the email exists, a password reset link has been sent",
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token before saving to database
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Set token and expiration (15 minutes from now)
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Save to database
    await adminModel.findByIdAndUpdate(admin._id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: resetExpires,
    });

    // Create reset URL
    const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/reset-password/${resetToken}`;

    // Email content
    const emailContent = {
      subject: 'Password Reset Request - Admin Panel',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f8fafc; }
            .button { 
              display: inline-block; 
              background: #1e40af; 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 20px 0;
            }
            .footer { padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
            .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hello Admin,</h2>
              <p>We received a request to reset your admin panel password. If you made this request, click the button below to reset your password:</p>
              
              <div style="text-align: center;">
                <a href="${resetURL}" class="button">Reset Password</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #1e40af;">${resetURL}</p>
              
              <div class="warning">
                <p><strong>⚠️ Important Security Information:</strong></p>
                <ul>
                  <li>This link will expire in 15 minutes</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>For security reasons, this link can only be used once</li>
                </ul>
              </div>
              
              <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
              <p>&copy; 2024 Admin Panel. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request
        
        Hello Admin,
        
        We received a request to reset your admin panel password. If you made this request, click the link below to reset your password:
        
        ${resetURL}
        
        This link will expire in 15 minutes.
        
        If you didn't request this reset, please ignore this email.
        
        For security reasons, this link can only be used once.
      `
    };

    // Send email
    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Password reset link has been sent to your email",
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Error processing forgot password request",
    });
  }
};

const adminController = {
  login,
  changePassword
};

export default adminController;


import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../constants/httpStatusCodes";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from Authorization header or cookie
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : req.cookies.adminToken;

    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
    }

    // Verify access token
    jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret",
      (err: Error | null, decoded: string | JwtPayload | undefined) => {
        if (!err && decoded) {
          req.user = decoded;
          return next();
        }

      // If token expired, try refresh token
      if (err?.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "No refresh token" });
        }

        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET || "refreshDefaultSecret",
          (refreshErr: Error | null, refreshDecoded: string | JwtPayload | undefined) => {
            if (refreshErr || !refreshDecoded) {
              return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid refresh token" });
            }

            // Create new access token
            const newAccessToken = jwt.sign(
              { userId: (refreshDecoded as JwtPayload).userId, isAdmin: true },
              process.env.JWT_SECRET || "defaultSecret",
              { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } as jwt.SignOptions
            );

            console.log("New Token created by rfresh",newAccessToken);
            res.setHeader("token", newAccessToken);
            req.user = refreshDecoded;
            next();
          }
        );
      } else {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid token" });
      }
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Authentication failed" });
  }
};

export default authMiddleware;

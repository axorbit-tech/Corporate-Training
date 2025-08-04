import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../constants/httpStatusCodes";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.adminToken;

  if (!token) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: No token provided" });
      return
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");

    req.user = decoded;

    next();
  } catch (err) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;

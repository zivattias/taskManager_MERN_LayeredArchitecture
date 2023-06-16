import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const requestUrlMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Request URL: ${req.url}`);
  next();
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return new Error("Token is missing");
    const token = authorization.split(" ")[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!(decodedToken as jwt.JwtPayload).user_id!)
      return res.status(401).json({
        token,
        message: "Invalid token",
      });
    req.body.user_id = decodedToken.user_id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

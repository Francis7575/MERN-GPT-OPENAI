import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";
import { config } from "dotenv";
config();

export const createToken = (id: string, email: string, expiresIn: string) => {
  // The payload is the data included in the token
  const payload = { id, email };
  // Signing the token using a secret key and specifying the expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn,
  });
  // Returning the created token
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    res.status(401).json({ message: "Token Not Received" });
  }
  
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET!, (err: any, success: any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
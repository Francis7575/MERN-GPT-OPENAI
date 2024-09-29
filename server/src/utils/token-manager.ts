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
  
  // Check if the token is provided
  if (!token || token.trim() === "") {
    res.status(401).json({ message: "Token Not Received" });
    return;
  }

  // Return a promise to verify the token
  const verifyPromise = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        reject(err); // Reject the promise on error
      } else {
        resolve(decoded); // Resolve the promise with the decoded data
      }
    });
  });

  // Use .then() and .catch() to handle the promise
  verifyPromise
    .then((decoded) => {
      res.locals.jwtData = decoded; // Store the decoded data in res.locals
      return next(); // Proceed to the next middleware or route handler
    })
    .catch((error) => {
      console.error("Verification error:", error); // Log the error
      res.status(401).json({ message: "Token Expired" }); // Respond with a 401 status
    });
};

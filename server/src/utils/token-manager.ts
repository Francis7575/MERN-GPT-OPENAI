import jwt from "jsonwebtoken";

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

import { Request, Response } from "express";
import User from "../models/User";
import { hash } from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    //get all users
    const users = await User.find();
    res.status(200).json({ message: "OK", users });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ message: "Error getting all users" });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "OK", id: user._id.toString() });
  }  catch (error: unknown) {
    console.log(error);
    res.status(500).json({ message: "Unable to create the user" });
  }
};

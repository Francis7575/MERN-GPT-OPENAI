import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { configureOpenAI } from "../config/openai.config";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
      return;
    }
    // grab chats of user
    const chats = user.chats.map(
      ({ role, content }: { role: any; content: any }) => ({
        role,
        content,
      })
    );
    // Add the user's current message to the temporary chats array for the API request
    const userMessage = { content: message, role: "user" };
    chats.push(userMessage);
    // Persist the user's current message to their chat history in the database
    user.chats.push(userMessage);

    const config = configureOpenAI();
    // get latest response
    const chatResponse = await config.chat.completions.create({
      model: "gpt-4o",
      messages: chats,
    });

    user.chats.push(chatResponse.choices[0].message);
    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
      return;
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
      return;
    }
    res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
      return;
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
      return;
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

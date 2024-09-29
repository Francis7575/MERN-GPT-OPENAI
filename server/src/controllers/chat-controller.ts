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
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const config = configureOpenAI();
    // get latest response
    const chatResponse = await config.chat.completions.create({
      model: "gpt-4o",
      messages: chats,
    });
    console.log(chatResponse);

    user.chats.push(chatResponse.choices[0].message);
    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

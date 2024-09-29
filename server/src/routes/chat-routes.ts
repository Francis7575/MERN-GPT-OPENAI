import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators";
import { generateChatCompletion } from "../controllers/chat-controller";
import { verifyToken } from "../utils/token-manager";

const chatRoutes = Router()

chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion)
export default chatRoutes
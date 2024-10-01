import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controller";
import { verifyToken } from "../utils/token-manager";

const chatRoutes = Router()

chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion)
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)
chatRoutes.delete("/delete", verifyToken, deleteChats)

export default chatRoutes
import { Router } from "express";
import userRoutes from "./user-routes";
import chatRoutes from "./chat-routes";

const appRouter = Router();

appRouter.use("/users", userRoutes); //domain/api/v1/user
appRouter.use("/chats", chatRoutes); //domain/api/v1/chats
4

export default appRouter;
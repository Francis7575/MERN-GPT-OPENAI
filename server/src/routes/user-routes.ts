import {
  loginValidator,
  validate,
} from "./../utils/validators";
import { Router } from "express";
import {
  userLogin,
  userLogout,
  verifyUser,
} from "../controllers/user-controller";
import { verifyToken } from "../utils/token-manager";

const userRoutes = Router();

// userRoutes.post("/signup", validate(signupValidator), userSignup)
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;

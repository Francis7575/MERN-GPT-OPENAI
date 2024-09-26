import { signupValidator, validate } from './../utils/validators';
import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controller";

const userRoutes = Router()

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", validate(signupValidator), userSignup)
export default userRoutes
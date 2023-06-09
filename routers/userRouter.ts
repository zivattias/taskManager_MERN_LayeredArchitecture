import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController, loginUserController,
  updateUserController,
} from "../controllers/userController.js";

export const userRouter: Router = Router();

userRouter.get("/", getUserController);
userRouter.post("/signup", createUserController);
userRouter.post("/login", loginUserController);
userRouter.patch("/:user_id", updateUserController);
userRouter.delete("/:user_id", deleteUserController);

import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController.js";

export const userRouter: Router = Router();

userRouter.get("/", getUserController);
userRouter.post("/", createUserController);
userRouter.patch("/:user_id", updateUserController);
userRouter.delete("/:user_id", deleteUserController);

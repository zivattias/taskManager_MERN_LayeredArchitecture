import {Router} from "express";
import {createTaskController, getTasksController} from "../controllers/taskController";

export const taskRouter: Router = Router();

taskRouter.get("/", getTasksController);
taskRouter.post("/", createTaskController);
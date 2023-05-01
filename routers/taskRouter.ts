import {Router} from "express";
import {createTaskController, deleteTaskController, getUserTasksController, updateTaskController} from "../controllers/taskController";

export const taskRouter: Router = Router();

taskRouter.get("/", getUserTasksController);
taskRouter.post("/", createTaskController);
taskRouter.patch("/:task_id", updateTaskController);
taskRouter.delete("/:task_id", deleteTaskController);
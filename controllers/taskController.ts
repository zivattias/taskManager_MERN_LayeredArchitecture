import { query, Request, Response } from "express";
import { createTaskHandler, getTasksHandler } from "../handlers/taskHandler";
import { ITask, ITaskDisplay } from "../interfaces/tasks";
import { createTaskBodySchema } from "../middlewares/bodyValidations";

export const getTasksController = (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;
    const result: ITaskDisplay[] = getTasksHandler(String(user_id));
    res.status(200).json({
      status: "Success",
      result,
    });
  } catch (error: any) {
    console.error(`Error in getTasksController: ${error.stack}`);
    res.status(500).json({
      status: "Internal error",
      error: error.message,
    });
  }
};

export const createTaskController = (req: Request, res: Response) => {
  try {
    const body = createTaskBodySchema.parse(req.body);
    const { title, description, isDone, user_id } = body;
    const result = createTaskHandler({
      title,
      description,
      isDone,
      user_id,
    });
    res.status(result ? 201 : 400).json({
      status: result ? "Success" : "Fail",
      message: result ? "Task created successfully" : "Task did not create",
    });
  } catch (error: any) {
    console.error(`Error in createTaskController: ${error.stack}`);
    res.status(500).json({
      status: "Internal error",
      error: error.message,
    });
  }
};

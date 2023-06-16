import { query, Request, Response } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getUserTasksHandler,
  updateTaskHandler,
} from "../handlers/taskHandler";
import { ITask, ITaskDisplay } from "../interfaces/tasks";
import {
  createTaskBodySchema,
  updateTaskBodySchema,
} from "../middlewares/bodyValidations";
import { InsertOneResult, ObjectId } from "mongodb";
import { isUserExists } from "../DAL/collections/users/queries";
import { ZodError } from "zod";
import { getTask, isTaskExists } from "../DAL/collections/tasks/queries";

export const getUserTasksController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;
    if (
      user_id &&
      ObjectId.isValid(String(user_id)) &&
      (await isUserExists(String(user_id)))
    ) {
      const result: ITaskDisplay[] = await getUserTasksHandler(String(user_id));
      res.status(200).json({
        status: "Success",
        result,
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message:
          "Invalid user_id, a valid user_id must be presented e.g. /tasks/<user_id>",
      });
    }
  } catch (error: any) {
    console.error(`Error in getTasksController: ${error.stack}`);
    res.status(500).json({
      status: "Internal error",
      error: error.message,
    });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const data = createTaskBodySchema.parse(req.body);
    if (
      data.user_id &&
      ObjectId.isValid(String(data.user_id)) &&
      (await isUserExists(String(data.user_id)))
    ) {
      const result = await createTaskHandler(data);
      res.status(result.success ? 201 : 400).json({
        status: result.success ? "Success" : "Fail",
        message: result.success
          ? "Task created successfully"
          : "Task did not create",
        ...(result.success && {
          task_id: (result as InsertOneResult).insertedId,
        }),
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Invalid user_id provided",
      });
    }
  } catch (error: any) {
    console.error(`Error in createTaskController: ${error.stack}`);
    if (error instanceof ZodError) {
      res.status(500).json({
        status: "Invalid data",
        error: error.errors,
      });
    }
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const data = updateTaskBodySchema.parse(req.body);
    const { task_id } = req.params;

    if (task_id && ObjectId.isValid(task_id) && (await isTaskExists(task_id))) {
      const result = await updateTaskHandler(task_id, data);

      res.status(result ? 200 : 400).json({
        status: result ? "Success" : "Fail",
        message: result
          ? `Task task_id=${task_id} has been updated`
          : "Task was not found",
        task: result ? await getTask(task_id) : null,
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Invalid task_id, e.g. /tasks/:task_id",
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "Invalid data received",
        message: error.errors,
      });
    }
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { task_id } = req.params;
    if (task_id && ObjectId.isValid(task_id)) {
      const result = await deleteTaskHandler(task_id);
      res.status(result ? 200 : 400).json({
        status: result ? "Success" : "Fail",
        message: result
          ? `Task ${task_id} deleted successfully`
          : "Task was not found",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Invalid task_id, e.g. /tasks/:task_id",
      });
    }
  } catch (error: any) {
    console.error(`Error in deleteTaskController: ${error.stack}`);
    res.status(500).json({
      status: "Internal error",
      error: error instanceof ZodError ? error.errors : error.message,
    });
  }
};

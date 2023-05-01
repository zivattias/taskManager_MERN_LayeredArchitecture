import { Request, Response } from "express";
import {
  createUserBodySchema,
  updateUserBodySchema,
} from "../middlewares/bodyValidations";
import { IDisplayedUser, IUser } from "../interfaces/users";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "../handlers/userHandler";
import { getUserQuerySchema } from "../middlewares/queryValidations";
import { ZodError } from "zod";
import { getUser } from "../DAL/collections/users/queries";
import { ObjectId } from "mongodb";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { user_id } = getUserQuerySchema.parse(req.query);
    const result: IDisplayedUser | undefined = await getUserHandler(
      String(user_id)
    );
    res.status(result !== undefined ? 200 : 400).json({
      status: result !== undefined ? "Success" : "Failure",
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

export const createUserController = async (req: Request, res: Response) => {
  try {
    const body = createUserBodySchema.parse(req.body);
    const { email, password, firstName } = body;
    const newUser: IUser = {
      email,
      password,
      firstName,
    };

    const result = await createUserHandler(newUser);

    res.status(result ? 201 : 400).json({
      status: result ? "Success" : "Fail",
      message: result ? "User created successfully" : "User did not create",
      data: result ? { email, firstName } : "Invalid data received",
    });
  } catch (error: any) {
    console.error(`Error in createUserController: ${error.stack}`);
    res.status(500).json({
      status: "Data error",
      error: error instanceof ZodError ? error.errors : error.message,
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const data = updateUserBodySchema.parse(req.body);
    const { user_id } = req.params;

    if (ObjectId.isValid(user_id)) {
      const result = await updateUserHandler(String(user_id), data);

      res.status(result ? 200 : 400).json({
        status: result ? "Success" : "Fail",
        message: result
          ? `User user_id=${user_id} has been updated`
          : "User was not found",
        user: result ? await getUser(user_id) : null,
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Invalid user_id",
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

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    if (ObjectId.isValid(user_id)) {
      const result = await deleteUserHandler(String(user_id));
      res.status(result ? 200 : 400).json({
        status: result ? "Success" : "Fail",
        message: result
          ? `User ${user_id} deleted successfully`
          : "User was not found",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Invalid user_id",
      });
    }
  } catch (error: any) {
    console.error(`Error in deleteUserController: ${error.stack}`);
    res.status(500).json({
      status: "Internal error",
      error: error instanceof ZodError ? error.errors : error.message,
    });
  }
};

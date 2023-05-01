import { ITask } from "../interfaces/tasks";
import { db } from "../index";
import { TASKS_COLLECTION_NAME } from "./collections/schema";
import { ObjectId } from "mongodb";
import { insertNewTask } from "./collections/tasks/queries";
import { updateTask } from "./collections/tasks/queries";
import { deleteTask } from "./collections/tasks/queries";

export const getUserTasksDAL = async (user_id: string) => {
  // TODO: toArray returns ONLY 101 first results
  try {
    return await db
      .collection(TASKS_COLLECTION_NAME)
      .find({ user_id: new ObjectId(user_id) })
      .toArray();
  } catch (error: any) {
    console.error(
      `Error getting Task with user_id=${user_id} at getUserTasksDAL()`
    );
    throw error;
  }
};

export const createTaskDAL = async (task: ITask) => {
  try {
    const result = await insertNewTask(task);
    return result;
  } catch (error: any) {
    console.error(`Error creating Task at createTaskDAL(): ${error.stack}`);
    throw error;
  }
};

export const updateTaskDAL = async (task_id: string, data: Partial<ITask>) => {
  try {
    const result = await updateTask(task_id, data);
    return result;
  } catch (error: any) {
    console.error(`Error updating Task at updateTaskDAL(): ${error.stack}`);
    throw error;
  }
};

export const deleteTaskDAL = async (task_id: string) => {
  try {
    const result = await deleteTask(task_id);
    return result;
  } catch (error: any) {
    console.error(`Error deleting Task at deleteTaskDAL(): ${error.stack}`);
    throw error;
  }
};

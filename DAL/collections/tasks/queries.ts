import { Collection, InsertOneModel, InsertOneResult, ObjectId } from "mongodb";
import { ITask, ITaskDisplay } from "../../../interfaces/tasks";
import { TASKS_COLLECTION_NAME } from "../schema";
import { db } from "../../../index";
import { isUserExists } from "../users/queries";

export const insertNewTask = async (task: ITask) => {
  const tasksCollection: Collection<ITask> = db.collection(
    TASKS_COLLECTION_NAME
  );
  const { user_id } = task;
  try {
    const userExists = await isUserExists(String(user_id));
    if (userExists) {
      console.log("Task: ");
      console.log(task);
      const result = await tasksCollection.insertOne({
        ...task,
        user_id: new ObjectId(task.user_id),
      });
      return { success: true, ...result };
    } else {
      return { success: false, message: "Nonexistant user" };
    }
  } catch (error: any) {
    console.error(`Error while trying to insert a new task: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const isTaskExists = async (user_id: string) => {
  const tasksCollection: Collection<ITask> = db.collection(
    TASKS_COLLECTION_NAME
  );
  try {
    const result = await tasksCollection.findOne({
      _id: new ObjectId(user_id),
    });
    return result !== null;
  } catch (error: any) {
    console.error(`Error in isTaskExists: ${error.stack}`);
    throw error;
  }
};

export const getTask = async (
  user_id: string
): Promise<ITaskDisplay | null> => {
  try {
    const result = await db.collection(TASKS_COLLECTION_NAME).findOne({
      _id: new ObjectId(user_id),
    });
    return result
      ? {
          title: result.title,
          ...(result.description && { description: result.description }),
          isDone: result.isDone,
        }
      : null;
  } catch (error: any) {
    console.error(`Error in getTask: ${error.stack}`);
    throw error;
  }
};

export const updateTask = async (task_id: string, data: Partial<ITask>) => {
  const tasksCollection = db.collection(TASKS_COLLECTION_NAME);
  try {
    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(task_id) },
      {
        $set: data,
      }
    );
    return result.matchedCount == 1;
  } catch (error: any) {
    console.error(
      `Error updating Task with task_id=${task_id} at updateTask(): ${error.stack}`
    );
    return false;
  }
};

export const deleteTask = async (task_id: string) => {
  const tasksCollection = db.collection(TASKS_COLLECTION_NAME);
  try {
    const result = await tasksCollection.deleteOne({
      _id: new ObjectId(task_id),
    });
    return result.deletedCount == 1;
  } catch (error: any) {
    console.error(
      `Error deleting Task with task_id=${task_id} at deleteTask(): ${error.stack}`
    );
    throw error;
  }
};

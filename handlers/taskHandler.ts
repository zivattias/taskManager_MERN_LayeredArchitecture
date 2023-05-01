import { createTaskDAL, deleteTaskDAL, getUserTasksDAL, updateTaskDAL } from "../DAL/taskDAL";
import { ITask, ITaskDisplay } from "../interfaces/tasks";

export const getUserTasksHandler = async (user_id: string) => {
  const dbResult = await getUserTasksDAL(user_id);
  if (dbResult) {
    const displayedTasks: ITaskDisplay[] = dbResult.map((task) => {
      return {
        title: task.title,
        ...(task.description && { description: task.description }),
        isDone: task.isDone,
      };
    });
    return displayedTasks;
  }
  return [];
};

export const createTaskHandler = async (task: ITask) => {
  const dbResult = await createTaskDAL(task);
  console.log(`dbResult is: ${dbResult.success}`);
  return dbResult;
};

export const updateTaskHandler = async (
    task_id: string,
    data: Partial<ITask>
  ) => {
    const dbResult = await updateTaskDAL(task_id, data);
    console.log(`updateUserHandler dbResult is: ${dbResult}`);
    return dbResult;
  };

  export const deleteTaskHandler = async (task_id: string) => {
    const dbResult = await deleteTaskDAL(task_id);
    console.log(`deleteUserHandler dbResult is: ${dbResult}`);
    return dbResult;
  };
  
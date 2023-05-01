import {createTaskDAL, getTasksDAL} from "../DAL/taskDAL";
import {ITask, ITaskDisplay} from "../interfaces/tasks";

export const getTasksHandler = (user_id: string) => {
    const dbResult: ITask[] = getTasksDAL(user_id);
    const displayedTasks: ITaskDisplay[] = dbResult.map((task: ITask): ITaskDisplay => {
        const {title, description, isDone} = task;
        return {
            title,
            description,
            isDone
        }
    });
    console.log(displayedTasks);
    return displayedTasks;
}

export const createTaskHandler = (task: ITask) => {
    const dbResult = createTaskDAL(task);
    console.log(`dbResult is: ${dbResult}`)
    return dbResult;
}
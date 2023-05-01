import {ITask} from "../interfaces/tasks";

const task1: ITask = {
    title: "Do homework",
    description: "Page 7",
    isDone: false,
    user_id: "1"
}

const task2: ITask = {
    title: "Run",
    isDone: false,
    user_id: "2"
}

const tasks: ITask[] = [task1, task2];

export const getTasksDAL = (user_id: string) => {
    const userTasks: ITask[] = tasks.filter((task: ITask) => task.user_id == user_id);
    console.log(userTasks);
    return userTasks;
};

export const createTaskDAL = (task: ITask) => {
    try {
        tasks.push(task);
        console.log("Task has been added to the DB");
        return true;
    } catch (error: any) {
        console.error(`Error inserting task: ${error.message}`)
        return false;
    }
};
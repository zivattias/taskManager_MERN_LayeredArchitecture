// Importing modules
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { taskRouter } from "./routers/taskRouter";
import { Db } from "mongodb";
import { createCollections, establishDBConnection } from "./DAL/connection";
import {
  TASKS_COLLECTION_NAME,
  USERS_COLLECTION_NAME,
} from "./DAL/collections/schema";
import { userRouter } from "./routers/userRouter";

// Init Express app
const app: Express = express();

// Use middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

export let db: Db;

const connectToDb = async () => {
  try {
    db = await establishDBConnection();
    await createCollections(db, [USERS_COLLECTION_NAME, TASKS_COLLECTION_NAME]);
  } catch (error) {
    throw error;
  }
};

connectToDb()
  .then(async () => {
    console.log("Connected to DB successfully");
    // Launching the app
    app.listen(3001, () => {
      console.log("Express app is running on 3001!");
    });
    // const user1: User = {
    //     email: "user@user.com",
    //     password: "helloworld",
    //     firstName: "User"
    // }
    // const result = await insertNewUser(user1)
    // console.log(result);
  })
  .catch((error: any) => {
    console.log("Failed to connect to DB");
    throw error;
  });

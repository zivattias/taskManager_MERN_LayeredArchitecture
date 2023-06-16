import { createCollection } from "./collections/schema";
import dotenv from "dotenv";
dotenv.config();
export const JWT_SECRET: string = process.env.JWT_SECRET!


export const checkIfCollectionExist = async (
  db: Db,
  collectionName: string
): Promise<boolean> => {
  const collections = await db.collections();
  return collections.some(
    (collection) => collection.collectionName === collectionName
  );
};

export const createCollections = async (
  db: Db,
  collectionsArray: string[]
): Promise<boolean> => {
  collectionsArray.map(
    async (collection) => await createCollection(db, collection)
  );
  return true;
};

import { Db, MongoClient, ServerApiVersion } from "mongodb";

const MONGO_URI: string = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@taskmanagermongocluster.4dofhov.mongodb.net/?retryWrites=true&w=majority`;
const DB_NAME: string = "taskManagerDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client: MongoClient = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const establishDBConnection = async (): Promise<Db> => {
  try {
    await client.connect();
    await client.db(DB_NAME).command({ ping: 1 });
    return client.db(DB_NAME);
  } catch (error: any) {
    console.error(`Error connecting to DB: ${error.stack}`);
    throw error;
  }
};

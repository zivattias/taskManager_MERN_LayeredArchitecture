import {checkIfCollectionExist} from "../connection";
import {Db} from "mongodb";
import {TASKS_COLLECTION_CONFIG, USERS_COLLECTION_CONFIG} from "./collectionConfig";
import {CollectionConfig} from "../../interfaces/collectionConfigs";

export const USERS_COLLECTION_NAME = 'users';
export const TASKS_COLLECTION_NAME = 'tasks';

const COLLECTION_CONFIG: {[key: string]: CollectionConfig} = {
    [USERS_COLLECTION_NAME]: USERS_COLLECTION_CONFIG,
    [TASKS_COLLECTION_NAME]: TASKS_COLLECTION_CONFIG,
}

const DROP_COLLECTION = false;

export const createCollection = async (db: Db, collectionName: string) => {
    try {
        const isCollectionExist: boolean = await checkIfCollectionExist(
            db,
            collectionName
        );
        if (isCollectionExist && DROP_COLLECTION) {
            await db.dropCollection(collectionName);
        } else if (isCollectionExist) {
            return;
        }
        const createdCollection = await db.createCollection(collectionName, COLLECTION_CONFIG[collectionName]);

        if (createdCollection) {
            // index fields
            switch (collectionName) {
                case USERS_COLLECTION_NAME:
                    await createdCollection.createIndex({ email: 1, _id: 1 }, { unique: true });
                    break;
                case TASKS_COLLECTION_NAME:
                    await createdCollection.createIndex({ user_id: 1 })
                    break;
                default:
                    console.error(`Wrong collection name in createCollection: ${collectionName}`)
            }
        }
    } catch (error: any) {
        console.error(`Error creating users collection: ${error.stack}`);
        throw error;
    }
};
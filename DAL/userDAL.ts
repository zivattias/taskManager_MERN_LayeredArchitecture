import { IUser } from "../interfaces/users";
import { db } from "../index";
import { USERS_COLLECTION_NAME } from "./collections/schema";
import { ObjectId } from "mongodb";
import { deleteUser, insertNewUser, updateUser } from "./collections/users/queries";

export const getUserDAL = async (user_id: string) => {
  try {
    return await db
      .collection(USERS_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(user_id) });
  } catch (error: any) {
    console.error(`Error getting User with user_id=${user_id} at getUserDAL()`);
    throw error;
  }
};

export const createUserDAL = async (user: IUser) => {
  try {
    const result = await insertNewUser(user);
    return result.success;
  } catch (error: any) {
    console.error(`Error creating User at createUserDAL(): ${error.stack}`);
    throw error;
  }
};

export const updateUserDAL = async (user_id: string, data: Partial<IUser>) => {
  try {
    const result = await updateUser(user_id, data);
    return result;
  } catch (error: any) {
    console.error(`Error updating User at updateUserDAL(): ${error.stack}`);
    throw error;
  }
};

export const deleteUserDAL = async (user_id: string) => {
    try {
        const result = await deleteUser(user_id);
        return result;
    } catch (error: any) {
        console.error(`Error deleting User at deleteUserDAL(): ${error.stack}`);
        throw error;
    }
}
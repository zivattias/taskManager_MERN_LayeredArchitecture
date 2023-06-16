import { USERS_COLLECTION_NAME } from "../schema";
import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { db } from "../../../index";
import {IDisplayedUser, IUser, IUserLogin} from "../../../interfaces/users";

export const findUserByEmail = async (user: IUserLogin) => {
  const { email } = user;
  const usersCollection: Collection<IUser> = db.collection(
      USERS_COLLECTION_NAME
  );
  try {
    const result = await usersCollection.findOne({ email });
    console.log(result);
    return result;
  } catch (error: any) {
    console.error(`Error while trying to find a user by email (${email}) @ ${findUserByEmail.name}`)
    throw Error(`Error while trying to find a user by email (${email}) @ ${findUserByEmail.name}`)
  }
}

export const insertNewUser = async (user: IUser) => {
  const usersCollection: Collection<IUser> = db.collection(
    USERS_COLLECTION_NAME
  );
  try {
    const result: InsertOneResult = await usersCollection.insertOne(user);
    return { success: true, ...result };
  } catch (error: any) {
    console.error(`Error while trying to insert a new user: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const isUserExists = async (user_id: string) => {
  const usersCollection: Collection<IUser> = db.collection(
    USERS_COLLECTION_NAME
  );
  try {
    const result = await usersCollection.findOne({
      _id: new ObjectId(user_id),
    });
    return result !== null;
  } catch (error: any) {
    console.error(`Error in isUserExists: ${error.stack}`);
    throw error;
  }
};

export const getUser = async (
  user_id: string
): Promise<IDisplayedUser | null> => {
  const usersCollection: Collection<IUser> = db.collection(
    USERS_COLLECTION_NAME
  );
  try {
    const result = await usersCollection.findOne({
      _id: new ObjectId(user_id),
    });
    if (result) {
      const { email, firstName } = result;
      return {
        email,
        firstName,
      };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error(`Error in getUser: ${error.stack}`);
    throw error;
  }
};

export const updateUser = async (user_id: string, data: Partial<IUser>) => {
  const usersCollection: Collection<IUser> = db.collection(
    USERS_COLLECTION_NAME
  );
  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: data,
      }
    );
    return result.matchedCount == 1;
  } catch (error: any) {
    console.error(
      `Error updating User with user_id=${user_id} at updateUser(): ${error.stack}`
    );
    return false;
  }
};

export const deleteUser = async (user_id: string) => {
  const usersCollection: Collection<IUser> = db.collection(
    USERS_COLLECTION_NAME
  );
  try {
    const result = await usersCollection.deleteOne({
      _id: new ObjectId(user_id),
    });
    return result.deletedCount == 1;
  } catch (error: any) {
    console.error(
      `Error deleting User with user_id=${user_id} at deleteUser(): ${error.stack}`
    );
    throw error;
  }
};

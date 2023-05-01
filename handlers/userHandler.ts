import { IDisplayedUser, IUser } from "../interfaces/users";
import {
  createUserDAL,
  deleteUserDAL,
  getUserDAL,
  updateUserDAL,
} from "../DAL/userDAL";

export const getUserHandler = async (user_id: string) => {
  const dbResult = await getUserDAL(user_id);
  if (dbResult) {
    const { email, firstName } = dbResult;
    const displayedUser: IDisplayedUser = {
      email,
      firstName,
    };
    return displayedUser;
  }
};

export const createUserHandler = async (user: IUser) => {
  const dbResult = await createUserDAL(user);
  console.log(`createUserHandler dbResult is: ${dbResult}`);
  return dbResult;
};

export const updateUserHandler = async (
  user_id: string,
  data: Partial<IUser>
) => {
  const dbResult = await updateUserDAL(user_id, data);
  console.log(`updateUserHandler dbResult is: ${dbResult}`);
  return dbResult;
};

export const deleteUserHandler = async (user_id: string) => {
  const dbResult = await deleteUserDAL(user_id);
  console.log(`deleteUserHandler dbResult is: ${dbResult}`);
  return dbResult;
};

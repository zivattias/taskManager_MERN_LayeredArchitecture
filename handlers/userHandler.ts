import {IDisplayedUser, ILoginHandlerResult, IUser, IUserLogin} from "../interfaces/users";
import {
  createUserDAL,
  deleteUserDAL,
  getUserDAL, loginUserDAL,
  updateUserDAL,
} from "../DAL/userDAL";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {JWT_SECRET} from "../DAL/connection";


export const loginUserHandler = async (user: IUserLogin): Promise<ILoginHandlerResult> => {
  try {
    const userResult = await loginUserDAL(user);
    if (userResult) {
      const isPasswordOK = await bcrypt.compare(user.password, userResult.password)
      if (!isPasswordOK) return {success: false, message: "Incorrect password"}
      const token = jwt.sign({user_id: userResult._id}, JWT_SECRET, {expiresIn: "10s"})
      return {
        success: true,
        token,
        user_id: String(userResult._id)
      }
    }
    return {success: false, message: "User not found"}
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
    }
  }
}


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
  user.password = await bcrypt.hash(user.password, 10);
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

export interface IDisplayedUser {
    email: string,
    firstName: string,
}

export interface IUser extends IDisplayedUser {
    password: string,
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface ILoginHandlerResult {
    success: boolean,
    message?: string,
    token?: string
    user_id?: string,
}

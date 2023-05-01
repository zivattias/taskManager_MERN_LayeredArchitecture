export interface IDisplayedUser {
    email: string,
    firstName: string,
}

export interface IUser extends IDisplayedUser {
    password: string,
}


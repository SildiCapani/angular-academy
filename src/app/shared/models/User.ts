export interface User{
    id: number,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    liked: number[]
}

export interface IUserLogin{
    email: string;
    password: string;
}

export interface IUserRegister{
    name: string,
    email: string,
    password: string,
    confirmPassword : string;
}
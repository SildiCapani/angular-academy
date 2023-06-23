export interface User{
    id: number,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
}

export interface IUserLogin{
    email: string;
    password: string;
}
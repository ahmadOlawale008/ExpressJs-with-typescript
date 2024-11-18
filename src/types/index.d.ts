import { Request } from 'express';
declare module "dotenv"
declare module 'express' {
    export interface Request{
        user?: string
    }
}
export type EmployeeType = {
    _id: number,
    firstname?: string,
    lastname?: number,
}
export type EmployeesType = {
    employees: EmployeeType[],
    setEmployees: (data: EmployeeType[])=>void
}
export type UserType = {
    _id: number,
    username?: string,
    password?: string,
    refreshToken?: string,
}
export type UsersType = {
    users: UserType[],
    setUsers: (data: UserType[])=>void
}

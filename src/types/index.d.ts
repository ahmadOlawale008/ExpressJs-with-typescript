import { Request } from 'express';
declare module "dotenv"
export interface RolesType {
    Admin?: 5150,
    Editor?: 1984,
    User?: 2001
}
declare module 'express' {
    export interface Request {
        user?: string,
        roles?: Exclude<(RolesType[keyof RolesType]), undefined>[]
    }
}
export type EmployeeType = {
    _id: number,
    firstname?: string,
    lastname?: number,
}
export type EmployeesType = {
    employees: EmployeeType[],
    setEmployees: (data: EmployeeType[]) => void
}

export type UserType = {
    _id: number
    username?: string
    password?: string
    refreshToken?: string
    roles: RolesType
}
export type AccessTokenType = {
    UserInfo: {
        username: string,
        roles: RolesType
    }
}
export type UsersType = {
    users: UserType[],
    setUsers: (data: UserType[]) => void
}

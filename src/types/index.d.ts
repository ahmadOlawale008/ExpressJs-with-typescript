declare module "dotenv"
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
}
export type UsersType = {
    users: UserType[],
    setUsers: (data: UserType[])=>void
}

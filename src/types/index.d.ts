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
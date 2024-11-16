import { Request, Response } from "express";
import { EmployeesType } from "types";
const data: EmployeesType = { employees: [] }
data.employees = require("../../model/employee.json")


export const getAllEmployees = (req: Request, res: Response) => {
    res.json(data.employees)
}
export const CreateEmployee = (req: Request, res: Response) => {
    res.json({
        "_id": (data.employees.at(-1)?._id || 0) + 1,
        "firstname": req.body.firstname,
        "lastname": req.body.firstname,
    })
}
export const UpdateEmployee = (req: Request, res: Response) => {
    const employee = data.employees.find((e) => e._id === parseInt(req.params.id))
    if (!employee)  {{res.status(404).send("Employee not found")}}
    else{
        employee.firstname = req.body.firstname
        employee.lastname = req.body.lastname
    }
    res.json({
        "_id": (data.employees.at(-1)?._id || 0) + 1,
        "firstname": req.body.firstname,
        "lastname": req.body.firstname,
    })
}
export const DeleteEmployee = (req: Request, res: Response) => {
    res.json({ "id": req.body.id })
}
export const GetEmployeeById = (req: Request, res: Response) => {
    res.json({ "id": req.params.id })
}
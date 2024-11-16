import { Request, Response } from "express";
import { EmployeesType, EmployeeType } from "types";
const data: EmployeesType = {
    employees: [], setEmployees: function (data) { this.employees = data }
}
data.employees = require("../model/employee.json")


export const getAllEmployees = (req: Request, res: Response) => {
    res.json(data.employees)
}
export const CreateEmployee = (req: Request, res: Response) => {
    const { body: fetchedData } = req;
    console.log(req.body, "Request body: ")
    if (!fetchedData.firstname || !fetchedData.lastname) {
        res.status(400).send("firstname and lastname are required")
        return
    }
    const newEmployees = {
        "_id": (data.employees.at(-1)?._id || 0) + 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
    }
    data.setEmployees([...data.employees, newEmployees])
    res.status(201).json({ ...newEmployees })
}
export const UpdateEmployee = (req: Request, res: Response) => {
    const employee = data.employees.find((e) => e._id === parseInt(req.params.id))
    if (!employee) {
        console.log(employee, " employee not found")
        res.status(404).send("Employee not found")
        return;
    }
    const updatedEmployee: EmployeeType = { ...employee, ...req.body, _id: employee._id }
    const filteredArray = data.employees.filter(emp => emp._id !== parseInt(req.params.id))
    const unsortedArray = [...filteredArray, updatedEmployee]
    data.setEmployees(unsortedArray.sort((a, b) => a._id > b._id ? 1 : a._id < b._id ? -1 : 0))
    res.json(unsortedArray)
}
export const DeleteEmployee = (req: Request, res: Response) => {
    const employee = data.employees.find((e) => e._id === parseInt(req.params.id))
    if (!employee) {
        res.status(404).send("Employee not found")
        return;
    }
    const filteredArray = data.employees.filter(emp => emp._id !== parseInt(req.params.id))
    data.setEmployees(filteredArray)
    res.status(200).json({ "success": "Deleted Successfully", data: data.employees })
}

export const GetEmployeeById = (req: Request, res: Response) => {
    const employee = data.employees.find((e) => e._id === parseInt(req.params.id))
    if (!employee) {
        res.status(404).send("Employee not found")
        return;
    }
    res.status(200).json(employee)
}
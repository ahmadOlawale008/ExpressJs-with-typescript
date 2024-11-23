import { Request, Response } from "express";
import Employyes from "../model/Employyes";
import { EmployeesType, EmployeeType } from "types";
const data: EmployeesType = {
    employees: [], setEmployees: function (data) { this.employees = data }
}
data.employees = require("../model/employee.json")

export const getAllEmployees = async (req: Request, res: Response) => {
    const employees = await Employyes.find()
    if (!employees) {
        res.status(204).json({ "msg": "No employees found" })
        return
    }
    res.json(employees)
    return
}

export const CreateEmployee = async (req: Request, res: Response) => {
    const { body: fetchedData } = req;
    if (!fetchedData.firstname || !fetchedData.lastname) {
        res.status(400).send("firstname and lastname are required")
        return
    }
    try {
        const newEmployees = await Employyes.create({
            firstname: fetchedData.firstname,
            lastname: fetchedData.firstname,
        })
        res.status(201).json(newEmployees)

    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ "success": false, "msg": error.message })
            return
        }
        res.status(401).json({ "success": false, "msg": "An Error has Occured, please try again" })
    }
}

export const UpdateEmployee = async (req: Request, res: Response) => {
    if (req.params.id && typeof req.params.id === "string") return
    const employee = await Employyes.findOne({ _id: parseInt(req.params.id) })
    if (!employee) {
        console.log(employee, "Employee not found")
        res.status(404).send("Employee not found")
        return;
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname
    if (req.body?.lastname) employee.lastname = req.body.lastname
    const result = await employee.save();
    res.json(result)
}

export const DeleteEmployee = (req: Request, res: Response) => {
    const employee = data.employees.find((e) => e._id === parseInt(req.params.id))
    if (!employee) {
        res.status(404).send("Employee not found")
        return;
    }
    const filteredArray = data.employees.filter(emp => emp._id !== parseInt(req.params.id))
    data.setEmployees(filteredArray)
    res.status(200).json({ "success": true, "msg": "Deleted Successfully", data: data.employees })
}

export const GetEmployeeById = (req: Request, res: Response) => {
    console.log("RAN PARAMS ID")
    const employee = data.employees.find((e) => e._id === parseInt(req.params.id))
    if (!employee) {
        res.status(404).send("Employee not found")
        return;
    }
    res.status(200).json(employee)
}
import express, { Router } from 'express';
import path from 'path';
import { EmployeesType } from '../../types/index';
import { CreateEmployee, DeleteEmployee, getAllEmployees, GetEmployeeById, UpdateEmployee } from '../../controllers/employeeControllers';
import { veryifyJwt } from "../../middleware/verifyJwt"
const router = Router()
router.route("/")
    .get(veryifyJwt, getAllEmployees)
    .post(CreateEmployee)
router.route("/:id")
    .get(GetEmployeeById)
    .put(UpdateEmployee)
    .delete(DeleteEmployee)
export default router

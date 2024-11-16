import express, { Router } from 'express';
import path from 'path';
import { EmployeesType } from '../../types/index';
import { CreateEmployee, DeleteEmployee, getAllEmployees, GetEmployeeById, UpdateEmployee } from '../../controllers/employeeControllers';

const router = Router()
router.route("/")
    .get(getAllEmployees)
    .post(CreateEmployee)
router.route("/:id")
    .get(GetEmployeeById)
    .put(UpdateEmployee)
    .delete(DeleteEmployee)
export default router

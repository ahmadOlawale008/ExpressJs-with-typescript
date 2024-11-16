import express, { Router } from 'express';
import path from 'path';
import { EmployeesType } from '../../types/index';
import { CreateEmployee, DeleteEmployee, getAllEmployees, GetEmployeeById, UpdateEmployee } from '../../controllers/employeeControllers';

const router = Router()
router.route("/")
    .get(getAllEmployees)
    .post(CreateEmployee)
    .put(UpdateEmployee)
    .delete(DeleteEmployee)
router.route(":id/")
    .get(GetEmployeeById)
export default router

import  { Router } from 'express';
import { CreateEmployee, DeleteEmployee, getAllEmployees, GetEmployeeById, UpdateEmployee } from '../../controllers/employeeControllers';
import { ROLES_LIST } from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';

const router = Router()
router.route("/")
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), CreateEmployee)
router.route("/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), GetEmployeeById)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), UpdateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),DeleteEmployee)
export default router

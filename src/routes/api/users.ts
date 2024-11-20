import { handleNewUser } from "../../controllers/registerUserController";
import { Router } from "express";
const router = Router();
router.route("/")
    .post(handleNewUser)
export default router
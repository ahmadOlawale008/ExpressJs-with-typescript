import { handleNewUser } from "../../controllers/registerUser";
import { Router } from "express";
const router = Router();
router.route("/")
    .post(handleNewUser)
export default router
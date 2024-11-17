import { handleLogin } from "../../controllers/authController";
import { Router } from "express";
const router = Router();
router.route("/")
    .post(handleLogin)
export default router
import { handleLogout } from "../../controllers/handleLogoutController";
import { Router } from "express";
const router = Router();
router.route("/")
    .get(handleLogout)
export default router
import { Router } from 'express';
import { refreshTokenController } from '../../controllers/refreshTokenController';

const router = Router()
router.route("/")
    .get(refreshTokenController)
export default router;
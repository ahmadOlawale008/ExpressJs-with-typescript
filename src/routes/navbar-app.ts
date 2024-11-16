import { Router } from "express";

const router = Router();
import path from "path";

router.get('^/$|index(.html|htm)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'navbar-app', "index.html"));
})
router.get('sample(.html|htm)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'navbar-app', "sample.html"));
})
export default router 
import { Router } from "express";
import { login_account, refresh, register_account} from "../controllers/login.controller.js";

const router = Router();

router.post("/register", register_account)
router.post("/login", login_account)
router.post("/refresh", refresh)

export default router 
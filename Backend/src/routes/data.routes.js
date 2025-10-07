import { Router } from "express";
import { clasification, newData, getData} from "../controllers/data.controller.js";
import { handleAuthToken } from "../middleware/authToken.js";

const router = Router();

router.get("/class/:mode", handleAuthToken, clasification)
router.put("/newData/:id", handleAuthToken, newData)
router.get("/getData/:id",handleAuthToken, getData)

export default router 
import Router from "router"
import {testController} from "../controllers/authController.js"
const router = Router()

router.get("/test",testController);

export default router;
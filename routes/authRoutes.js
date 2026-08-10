import Router from "router"
import {testController,registerController} from "../controllers/authController.js"
const router = Router()



router.get("/test",testController);
router.post("/register",registerController)


export default router;
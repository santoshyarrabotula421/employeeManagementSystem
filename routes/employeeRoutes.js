import Router from "router"
import verifyJWT from "../middlewares/authMiddleware.js"
import authorizedRoles from "../middlewares/roleMiddleware.js"
import {createEmployeeController} from "../controllers/employeeController.js"

const router = Router()

router.post("/",verifyJWT,authorizedRoles("admin"),createEmployeeController)

export default router
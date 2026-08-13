import Router from "router"
import verifyJWT from "../middlewares/authMiddleware.js"
import authorizedRoles from "../middlewares/roleMiddleware.js"
import {createEmployeeController,getEmployees} from "../controllers/employeeController.js"

const router = Router()

router.post("/",verifyJWT,authorizedRoles("admin"),createEmployeeController)
router.get("/",verifyJWT,authorizedRoles("admin","employee"),getEmployees)

export default router
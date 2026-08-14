import Router from "router"
import verifyJWT from "../middlewares/authMiddleware.js"
import authorizedRoles from "../middlewares/roleMiddleware.js"
import {createEmployeeController,
       getEmployees,getEmployeeById,
       updateEmployee} from "../controllers/employeeController.js"

const router = Router()

router.post("/",verifyJWT,authorizedRoles("admin"),createEmployeeController)
router.get("/",verifyJWT,authorizedRoles("admin","employee"),getEmployees)
router.get("/:id",verifyJWT,authorizedRoles("admin","employee"),getEmployeeById)
router.put("/:id",verifyJWT,authorizedRoles("admin"),updateEmployee)

export default router
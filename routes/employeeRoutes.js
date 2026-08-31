import Router from "router"
import verifyJWT from "../middlewares/authMiddleware.js"
import authorizedRoles from "../middlewares/roleMiddleware.js"
import { updateEmployeeValidator,createEmployeeValidator, getEmployeesValidator } from "../validators/employeeValidator.js"
import {createEmployeeController,
       getEmployees,getEmployeeById,
       updateEmployee,deleteEmployee} from "../controllers/employeeController.js"
import validationMiddleware from "../middlewares/validationMiddleware.js"

const router = Router()

router.post(
    "/",
    verifyJWT,
    authorizedRoles("admin"),
    createEmployeeValidator,
    validationMiddleware,
    createEmployeeController
);
router.get("/",verifyJWT,
    authorizedRoles("admin","employee"),
    getEmployeesValidator,
    validationMiddleware,
    getEmployees)
router.get("/:id",verifyJWT,authorizedRoles("admin","employee"),getEmployeeById)
router.put(
    "/:id",
    verifyJWT,
    authorizedRoles("admin"),
    updateEmployeeValidator,
    validationMiddleware,
    updateEmployee
);
router.delete("/:id",verifyJWT,authorizedRoles("admin"),deleteEmployee)

export default router
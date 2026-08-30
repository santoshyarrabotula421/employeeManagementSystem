import Router from "router"
import { registerValidator,loginValidator } from "../validators/authValidator.js"
import validationMiddleware from "../middlewares/validationMiddleware.js"
import verifyJWT from "../middlewares/authMiddleware.js"
import authorizedRoles from "../middlewares/roleMiddleware.js"
import {testController,registerController,loginController} from "../controllers/authController.js"
const router = Router()



router.get("/test",testController);
router.post("/register",registerValidator,validationMiddleware,registerController)
router.post("/login",loginValidator,validationMiddleware,loginController);
router.get("/protected",verifyJWT,(req,res)=>{
    return res.status(200).json({
        success : true,
        message : "User accesed protected route succesfully",
        user : req.user
    })
})
/*router.get("/admin-test",verifyJWT,authorizedRoles("admin","employee"),(req,res)=>{
    return res.status(200).json({
            success: true,
            message: "Admin route accessed successfully"
})})*/ // sample test router for checking role based access;

export default router;
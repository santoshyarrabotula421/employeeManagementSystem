import Router from "router"
import verifyJWT from "../middlewares/authMiddleware.js"
import {testController,registerController,loginController} from "../controllers/authController.js"
const router = Router()



router.get("/test",testController);
router.post("/register",registerController)
router.post("/login",loginController);
router.get("/protected",verifyJWT,(req,res)=>{
    return res.status(200).json({
        success : true,
        message : "User accesed protected route succesfully",
        user : req.user
    })
})

export default router;
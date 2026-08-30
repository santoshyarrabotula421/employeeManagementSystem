import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { successResponse } from "../utils/response.js";
const testController = (req,res) => {
    res.status(200).json({
        "success" : true,
        "message" : "testRoute created succesfully"
    })
}

const registerController = async(req,res,next)=>{
    try{
    const {name,email,password} = req.body;
    const existedUser = await User.findOne({email});
    if(existedUser)
    {
        return res.status(409).json({
            "success" : false,
            "message" : "email already exists!"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    
    await User.create({name,email,password : hashedPassword})
    return successResponse(res,201,"user created successfully")
    
}catch(err){
    next(err)
}

}

const loginController = async(req,res,next) =>{
    try
    {
    const user = await User.findOne({email});
    if(!user)
    {
        return res.status(401).json({
            success : false,
            message : "Invalid email or password"     
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect)
    {
         return res.status(401).json({
            success : false,
            message : "Invalid email or password"     
        })
    }
    const jwtToken = jwt.sign({
        userId : user._id,
        role : user.role
    },process.env.JWT_SECRET_KEY,{expiresIn :process.env.JWT_EXPIRY});
    return successResponse(res,200,"User loggedin succesfully",jwtToken)
    }
    catch(err)
    {
       next(err)
    }
}
export {testController,registerController,loginController};
import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const testController = (req,res) => {
    res.status(200).json({
        "success" : true,
        "message" : "testRoute created succesfully"
    })
}

const registerController = async(req,res)=>{
    try{
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({
            "success" : false,
            "message" : "All fields required"
        })
    }
    if(password.length < 6)
    {
        res.status(400).json({
            success : false,
            message : "password should be atleast 6 characters"
        })
    }
    const existedUser = await User.findOne({email});
    if(existedUser)
    {
        return res.status(409).json({
            "success" : false,
            "message" : "email already exists!"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await User.create({name,email,password : hashedPassword});
    
    res.status(201).json({
        "success" : true,
        "message" : "user created successfully"
    })
}catch(err){
    res.status(500).json({
        success : false,
        message : "Internal server error"
    })
}

}

const loginController = async(req,res) =>{
    try
    {
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({
            success : false,
            message : "email or password is missing"
        })
    }
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
    return res.status(200).json({
        success : true,
        message :"user loggedin succesfully",
        token : jwtToken
    })}catch(err)
    {
        console.error("Login error ",err);
        return res.status(500).json({
            success : false,
            message : "something went wrong"
        })
    }
}
export {testController,registerController,loginController};
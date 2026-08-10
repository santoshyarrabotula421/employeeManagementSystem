import User from "../models/user.js"
import bcrypt from "bcrypt";

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


export {testController,registerController};
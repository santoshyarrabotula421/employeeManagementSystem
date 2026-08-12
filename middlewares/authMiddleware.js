import jwt from "jsonwebtoken"
const verifyJWT = (req,res,next)=>{
    try{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token)
    {
        return res.status(401).json({
            success : false,
            message : "Authentication required"
        })
    }
    const decodedUser = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = decodedUser
    next();
}catch(err)
{
    return res.json(401).status({
        success : false,
        message : "Invalid or expires Token"
    })
}
}
export default verifyJWT;
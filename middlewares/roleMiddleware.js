const authorizedRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        const role = req.user.role;
        if(!allowedRoles.includes(role))
        {
            return res.status(403).json({
                success : false,
                message : "You are not permitted for this operation"
            })
        }
        next();
    }
}
export default authorizedRoles
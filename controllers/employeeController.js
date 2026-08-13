import Employee from "../models/employee.js"
import User from "../models/user.js"

const createEmployeeController = async(req,res)=>{
    try{
    const {user,employeeId,department,designation,salary,phone,joiningDate} = req.body;
    if(!user || !employeeId || !department || !designation || 
        salary===undefined  || salary === null || !phone || !joiningDate)
         {
            return res.status(400).json({
                success : false,
                message : "Some fields are missing"
            })
         }
    const userExist = await User.findOne({_id :user,role : "employee"})
    if(!userExist)
    {
        return res.status(404).json({
            success : false,
            message : "User with provided id is not existed"
        })
    }
    const employeeIdExist = await Employee.findOne({employeeId})
    if(employeeIdExist)
    {
        return res.status(409).json({
            success : false,
            message : "EmployeeID already exists"
        })
    }
    const newEmployee = {user,employeeId,department,designation,salary,phone,joiningDate}
    await Employee.create(newEmployee);
    res.status(201).json({
        success : true,
        message : "Employee created succefully"
    })
}catch(err)
{
    res.status(500).json({
        success : false,
        message : "unexpected server error"
    })
}
}

const getEmployees = async(req,res) =>{
    const employees = await Employee.find().populate("user","-password");
    return res.status(200).json({
        success : true,
        employees
    })
}

export {createEmployeeController,getEmployees};
import Employee from "../models/employee.js"
import User from "../models/user.js"
import mongoose from "mongoose"
import { successResponse } from "../utils/response.js"
const createEmployeeController = async(req,res,next)=>{
    try{
    
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
    return successResponse(res,201,"Employee created successfully")
}catch(err)
{
    next(err)
}
}

const getEmployees = async(req,res) =>{
    const employees = await Employee.find().populate("user","-password");
    return successResponse(res,200,"Employees fetched successfully",employees)
}

const getEmployeeById = async(req,res,next)=>{
    try{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({
            success : false,
            message : "Invalid id provided"
        })
    }
    const employeeDetails = await Employee.findById(id).populate("user","-password")
    if(!employeeDetails)
    {
        return res.status(404).json({
            success : false,
            message : "Employee not found"
        })
    }
    return successResponse(res,200,"Employee Found succesfully",employeeDetails)
}catch(err)
{
   next(err)
}

}

const updateEmployee = async(req,res,next)=>{
    try{
    const {id} = req.params 
    
    const {designation,department,salary,phone,joiningDate} = req.body 
    const updates = {}
    if(designation!== undefined) updates.designation = designation
    if(department!== undefined) updates.department = department
    if(salary!== undefined) updates.salary = salary
    if(phone!== undefined) updates.phone = phone
    if(joiningDate!== undefined) updates.joiningDate = joiningDate 
    if(Object.keys(updates).length === 0) 
    {
        return res.status(400).json({
            success :false,
            message :"No fields provided to update"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({
            success : false,
            message : "Invalid userId"
        })
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(id,updates,{new : true,runValidators : true}).populate("user","-password")
    if(!updatedEmployee)
    {
         return res.status(404).json({
            success : false,
            message : "Employee not found"
        })
    }
    return successResponse(res,200,"Employee details updated sucessfully",employee)
    }
    catch(err){
        next(err)
    }
}

const deleteEmployee = async(req,res,next)=>{
    try{
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({
            success : false,
            message : "Invalid Employee Id"
        })
    }
    
   const deletedEmployee =  await Employee.findByIdAndDelete(id)
   if(!deletedEmployee)
   {
     return res.status(404).json({
            success : false,
            message : "Employee not found"
        })
   }
   return successResponse(res,200,"Employee deleted succesfully")
   }
   catch(err)
   {
      next(err)
   }

}
export {createEmployeeController,getEmployees,getEmployeeById,updateEmployee,deleteEmployee};
import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    employeeId :{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    department : {
        type : String,
        required : true,
        trim : true
    },
    designation :{
        type : String,
        required : true,
        trim : true
    },
    salary : {
        type : Number,
        required : true,
        min : 0
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    joiningDate : {
        type : Date,
        required : true
    }
},{timestamps : true})

const Employee =  mongoose.model("Employee",employeeSchema)

export default Employee
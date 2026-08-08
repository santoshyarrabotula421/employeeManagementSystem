import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
        minlength : 4
    },
    email :{
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    role : {
        type : String,
        enum :["admin","employee"],
        default : "employee"
    }
},{timestamps :true})

const User = new mongoose.model("User",userSchema);

export default User;
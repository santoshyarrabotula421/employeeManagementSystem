import dotenv from "dotenv"
dotenv.config() // if the dot.env is not present in the same root we need to give the path of dotenv in the config.
// require('dotenv').config({ path: '/custom/path/to/.env' })
// console.log(`User Name : ${process.env.NAME}`)
import app from "./app.js"

import connectDB from "./config/db.js"

const PORT = process.env.PORT || 8000
try{
await connectDB();

app.listen(PORT,()=>{
    console.log(`Server is listeing at ${PORT}`);
})
}catch(err){
    console.error("Failed to start server : ",err)
}
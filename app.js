import express from "express"
const app = express()
import authRouter from "./routes/authRoutes.js"
import employeeRouter from "./routes/employeeRoutes.js"

app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/employees",employeeRouter)

 export default app
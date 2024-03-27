import express from "express"
import dotenv from"dotenv"
import authRoute from "./routes/authRoutes/register.js"
import loginRoute from "./routes/authRoutes/login.js"
import refreshRoute from "./routes/authRoutes/refresh.js"
import chatRoute from "./routes/chat/chat.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app=express()
const PORT=process.env.PORT || 3500
app.use(express.json())
app.use(cookieParser())
app.use("/register",authRoute)
app.use("/login",loginRoute)
app.use("/refresh",refreshRoute)
app.use("/chat",chatRoute)
export const nodeServer=app.listen(PORT,()=>console.log(`server running on ${PORT}`))

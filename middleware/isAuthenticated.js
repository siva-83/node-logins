import jwt, { decode } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const isAuthenticated=(req,res,next)=>{
        const head=req.headers['authorization']
        const token=head.split(" ")[1]
        if(!token){
            return res.status(401).json({"message":"your not authorized person"})
        }
        jwt.verify(token,process.env.access_secret_key,(err,decoded)=>{
            if(err) return res.status(403)
            req.user=decoded.user
        next()
        })

}
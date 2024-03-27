import { Server } from "socket.io"
import {nodeServer} from "../../index.js"
export const chatHandler=async(req,res)=>{
    const io=new Server(nodeServer,{
        cors:{
            origin:["http://localhost:3500", "http://127.0.0.1:3500"]
        }
    })
    io.on("connection",socket=>{
        console.log("connection formed",socket.request.user)
        socket.on("message",data=>{
            io.emit("message",data)
        })
    })
}
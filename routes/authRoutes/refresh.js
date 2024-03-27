import express from "express";
import {handleRefresh} from "../../controllers/authControllers/handleregister.js"

const router=express.Router()

router.post("/",handleRefresh)
export default router;
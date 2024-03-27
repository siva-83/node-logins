import express from"express"
import { v4 as uuidv4 } from 'uuid';
import {handleRegistration} from "../../controllers/authControllers/handleregister.js"
const router=express.Router()
router.post("/",handleRegistration)
export default router;
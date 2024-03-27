import express from"express"
import {handleLogin} from "../../controllers/authControllers/handleregister.js"
const router=express.Router()
router.post("/",handleLogin)
export default router;
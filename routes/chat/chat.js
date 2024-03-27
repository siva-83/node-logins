import express from"express"
import {isAuthenticated} from "../../middleware/isAuthenticated.js"
import {chatHandler} from "../../controllers/chatControllers/chatHandler.js"
const router=express.Router()
router.post("/",isAuthenticated,chatHandler)
export default router
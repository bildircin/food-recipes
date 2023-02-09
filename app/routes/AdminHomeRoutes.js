import express from 'express'
const router = express.Router()
import adminHomeController from '../controllers/AdminHomeController.js'

router.get("/admin", adminHomeController.home)


export default router;
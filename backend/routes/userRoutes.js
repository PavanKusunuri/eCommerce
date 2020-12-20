import express from 'express'
const router = express.Router()
import {
    authUser
} from '../controllers/userController.js'

router.post("/login", authUser);

// router.route('/login').post(authUser)

export default router
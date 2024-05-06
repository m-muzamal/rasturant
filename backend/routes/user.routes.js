import { Router } from 'express'
import { allUser, loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/user.controllers.js'
import { varifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(varifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/users").get(allUser)

export default router
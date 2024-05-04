import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.controllers.js'
import { varifyJWT } from '../middlewares/auth.middleware.js'
// import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/register").post(
    // to accept the image
    // upload.fields([
    //     {
    //         name: "avatar",
    //         maxCount: 1
    //     }
    // ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(varifyJWT, logoutUser)

export default router
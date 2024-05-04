import { asyncHandler } from '../utils/asyncHandler.js'
import { APIerror } from '../utils/APIerror.js'
import { User } from '../models/user.models.js'
import { APIResponse } from '../utils/APIResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log("Name: ", name, "Email: ", email, "Password: ", password)

    if ([name, email, password].some((field) => field?.trim === '')) {
        throw new APIerror(400, "All fields are required!")
    }

    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (existedUser) {
        throw new APIerror(409, "User is already existed!")
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!userCreated) {
        throw new APIerror(500, "Somthing went wrong in registring the user")
    }

    return res.status(201).json(
        new APIResponse(200, userCreated, "User registered successfully")
    )

})

export { registerUser }
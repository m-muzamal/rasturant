import { asyncHandler } from '../utils/asyncHandler.js'
import { APIerror } from '../utils/APIerror.js'
import { User } from '../models/user.models.js'
import { APIResponse } from '../utils/APIResponse.js'
import jwt from 'jsonwebtoken'

const genrateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new APIerror(500, "Somthing went wrong in genrating refresh & token")

    }
}

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

const allUser = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken")

    if (!users) {
        throw new APIerror(500, "Somthing went wrong in getting the users")
    }

    return res
        .status(200)
        .json(new APIResponse(200,
            {
                users: users,
            }, "Geting all teh users successfully!"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body

    if (!email) {
        throw new APIerror(400, "Email and password is required!")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new APIerror(404, "User dose not exist!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new APIerror(401, "Invalid user password!")
    }

    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new APIResponse(200,
            {
                user: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken
            }, "User loggedIn successfully"))

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new APIResponse(200, {}, "User logged out successfully!"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

        if (!incomingRefreshToken) {
            throw new APIerror(401, "Unauthorized access!")
        }

        const deCodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(deCodedToken?._id)

        if (!user) {
            throw new APIerror(401, "Invalid refresh token!")
        }

        if (incomingRefreshToken !== user?.refreshAccessToken) {
            throw new APIerror(401, "Refresh token is expired or used!")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await genrateAccessAndRefreshToken(user._id)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new APIResponse
                (
                    200,
                    { accessToken, newRefreshToken },
                    "Access token refresh!"
                )
            )
    } catch (error) {
        throw new APIerror(401, `Invalid refresh token ${error}`)

    }

})

export { registerUser, loginUser, logoutUser, refreshAccessToken, allUser }
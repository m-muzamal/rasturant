import jwt, { decode } from "jsonwebtoken";
import { APIerror } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";


export const varifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        console.log("Token: ", token)

        if (!token) {
            throw new APIerror(401, "Unauthorized access!")
        }

        const deCodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(deCodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new APIerror(401, "Invaild access Token!")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new APIerror(401, `Invalid access middleware token! ${error}`)
    }
}) 
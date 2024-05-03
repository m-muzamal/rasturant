import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            tolowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            tolowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        }
    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = async function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.genrateRefreshToken = async function () {
    jwt.sign(
        {
            _id: this._id,
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        category: {
            type: String,
            required: true,
            index: true
        },
        newPrice: {
            type: Number,
            required: true,
            default: 0
        },
        oldPrice: {
            type: Number,
            default: 0
        },
        image: {
            type: String, //cloudnary image
            required: true,
        },
    }, { timestamps: true }
)

export const Product = mongoose.model('Product', productSchema)
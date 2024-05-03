import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        newPrice: {
            type: Number,
            required: true,
        },
        oldPrice: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
)

export const Product = mongoose.model('Product', productSchema)
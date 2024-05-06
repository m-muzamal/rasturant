import { Product } from '../models/product.models.js'
import { APIResponse } from '../utils/APIResponse.js';
import { APIerror } from '../utils/APIerror.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from '../utils/cloudnary.js'

const addProduct = asyncHandler(async (req, res) => {
    const { name, category, newPrice, oldPrice, image } = req.body

    if ([name, category, newPrice, oldPrice, image].some((item) => item?.trim === '')) {
        throw new APIerror(400, "All the fields are required!")
    }
    console.log("req.body=>", req.body)
    const existedProduct = await Product.findOne({
        $or: [{ name }]
    })

    if (existedProduct) {
        throw new APIerror(409, "Product already existed!")
    }

    const imageLocalPath = await req.files?.image[0]?.path

    if (!imageLocalPath) {
        throw new APIerror(400, "Image is required!")
    }

    const img = await uploadOnCloudinary(imageLocalPath)

    if (!img) {
        throw new APIerror(500, "Somthing went wrong in uploading image!")
    }

    const product = await Product.create({
        name,
        category,
        newPrice,
        oldPrice,
        image: img?.url || null
    })

    const productCreated = await Product.findById(product._id).select("-password -refreshToken")

    if (!productCreated) {
        throw new APIerror(500, "Somthing went wrong in creating product!")
    }

    return res.status(201).json(
        new APIResponse(200, productCreated, "Product created successfully!")
    )

})

const allProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().select("-password -refreshToken")

        if (!products) {
            throw new APIerror(500, "Somthing went wrong in getting products!")
        }

        return res
            .status(200)
            .json(new APIResponse(200,
                {
                    products: products
                }, "Getting all the products successfully!")
            )
    } catch (error) {
        throw new APIerror(404, "Somthing went wrong!")
    }
})

export { allProduct, addProduct }
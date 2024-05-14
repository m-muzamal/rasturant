import { Product } from '../models/product.models.js'
import { APIResponse } from '../utils/APIResponse.js';
import { APIerror } from '../utils/APIerror.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from '../utils/cloudnary.js'
import { Stripe } from "stripe";
const stripe = new Stripe("sk_test_51PBRzCRp2oHR08Od7gCz1DSbFvEy5wrq8dpdXs5Y7xog2WOnJc59k81r88zbcLUIfCxoueGBSkfQa6PL4Pzvrwfy00YrJrk4dO")

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

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const product = await Product.findById(id);

        if (!product) {
            throw new APIerror(404, "Product not found!");
        }

        await Product.deleteOne({ _id: id })

        return res.status(200).json(
            new APIResponse(200, {}, "Product deleted successfully!")
        );
    } catch (error) {
        throw new APIerror(404, `Somthing went wrong in deleting product!: ${error}`)
    }
});

const checkout = asyncHandler(async (req, res) => {
    try {

        const { product } = req.body;
        console.log(product);

        const sessions = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: product,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'http://localhost:5173',
            cancel_url: 'http://localhost:5173',
        });

        res.json({ id: sessions.id })
    } catch (error) {
        // console.dir({ error }, { depth: null })
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
})

export { allProduct, addProduct, deleteProduct, checkout }
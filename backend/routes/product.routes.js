import { Router } from 'express'
import { addProduct, allProduct } from '../controllers/product.controllers.js'
import { upload } from '../middlewares/multer.middleware.js'


const router = Router()

router.route("/add-product").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),
    addProduct
)

router.route("/all-products").get(allProduct)

export default router
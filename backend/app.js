import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
// import { Stripe } from "stripe";
// const stripe = new Stripe("sk_test_51PBRzCRp2oHR08Od7gCz1DSbFvEy5wrq8dpdXs5Y7xog2WOnJc59k81r88zbcLUIfCxoueGBSkfQa6PL4Pzvrwfy00YrJrk4dO")


app.use("/api/v1/users", userRouter)

app.use("/api/v1/products", productRouter)

// app.post("/api/checkout", async (req, res) => {

//     try {

//         const { product } = req.body;
//         console.log(product);

//         const sessions = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price: product,
//                     quantity: 1,
//                 },
//             ],
//             mode: 'subscription',
//             success_url: 'http://localhost:5173',
//             cancel_url: 'http://localhost:5173',
//         });

//         res.json({ id: sessions.id })
//     } catch (error) {
//         // console.dir({ error }, { depth: null })
//         console.log(error.message);
//         res.status(400).json({ message: error.message });
//     }
// })

export { app }
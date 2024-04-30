import { createSlice } from "@reduxjs/toolkit"
import menuImage1 from '../../assets/menu-1.png'
import menuImage2 from '../../assets/menu-2.png'
import menuImage3 from '../../assets/menu-3.png'
import menuImage4 from '../../assets/menu-4.png'
import menuImage5 from '../../assets/menu-5.png'
import menuImage6 from '../../assets/menu-6.png'
import productImage1 from '../../assets/product-1.png'
import productImage2 from '../../assets/product-2.png'
import productImage3 from '../../assets/product-3.png'

const initialState = {
    cart: [],
    menu: [
        {
            img: menuImage1,
            name: "Burger and drink",
            newPrice: "150",
            oldPrice: "20.99",
        },
        {
            img: menuImage2,
            name: "Nuggets and fries",
            newPrice: "200",
            oldPrice: "20.99",
        },
        {
            img: menuImage3,
            name: "Zinger pieces",
            newPrice: "500",
            oldPrice: "20.99",
        },
        {
            img: menuImage4,
            name: "Large pizza",
            newPrice: "1200",
            oldPrice: "20.99",
        },
        {
            img: menuImage5,
            name: "Pasta, Oringe juice, Wrap",
            newPrice: "1000",
            oldPrice: "20.99",
        },
        {
            img: menuImage6,
            name: "Coffy",
            newPrice: "300",
            oldPrice: "20.99",
        },
    ],
    products: [
        {
            img: productImage1,
            name: "Burger",
            newPrice: "600",
            oldPrice: "700",
        },
        {
            img: productImage2,
            name: "Medium pizza",
            newPrice: "800",
            oldPrice: "950",
        },
        {
            img: productImage3,
            name: "Ice cream",
            newPrice: "150",
            oldPrice: "200",
        },
    ],
}

export const resturantSlice = createSlice({
    name: "resturant",
    initialState,
    reducers: {
        //cart reducers
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.name !== action.payload.name)
        },

        //menu reducers
        addToMenu: (state, action) => {
            state.menu.push(action.payload)
        },
        removeFromMenu: (state, action) => {
            state.menu = state.menu.filter((item) => item.name !== action.payload.name)
        },

        //products reducers
        addToProd: (state, action) => {
            state.products.push(action.payload)
        },
        removeFromProd: (state, action) => {
            state.products = state.products.filter((item) => item.name !== action.payload.name)
        },


    },
})

export const { addToCart, removeFromCart, addToMenu, removeFromMenu, addToProd, removeFromProd } = resturantSlice.actions;

export default resturantSlice.reducer;
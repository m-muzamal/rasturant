import { configureStore } from "@reduxjs/toolkit";
import resturantSlice from "./resturantSlice/resturantSlice";

export const store = configureStore({
    reducer: {
        resturant: resturantSlice
    }
})
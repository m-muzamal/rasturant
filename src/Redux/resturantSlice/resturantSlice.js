import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: []
}

export const resturantSlice = createSlice({
    name: "resturant",
    initialState,
    reducers: {
        setResturant: (state, action) => {
            state.value.push(action.payload)
        },
        removeResturant: (state, action) => {
            state.value = state.value.filter((item) => item.name !== action.payload.name)
        }
    },
})

export const { setResturant, removeResturant } = resturantSlice.actions;

export default resturantSlice.reducer;
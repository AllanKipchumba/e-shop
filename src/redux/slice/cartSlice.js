import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //save in local storage to rehydrate store --preserve state after releoad

    //Check if the value of cartItems exists in local storage. If it does, set the value of cartItems to the value stored in local storage
    cartItems: localStorage.getItem("cartItems") //serialize cartItems
        ?
        JSON.parse(localStorage.getItem("cartItems")) :
        [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            const { product } = action.payload;
            console.log(product);
        },
    },
});

export const { ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
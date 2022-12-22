import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    //save in local storage to rehydrate store --preserve state after releoad

    //Check if the value of cartItems exists in local storage.
    //If it does, set the value of cartItems to the value stored in local storage, else cartItems is an empty []
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
            //check if element already exists in cart
            //array.findIndex returns -1 if no such item is found
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (productIndex >= 0) {
                //item already exists in the cart
                //increase the cart quntity
                state.cartItems[productIndex].cartQuantity += 1;
                toast.info(`${action.payload.name} was increased by one`, {
                    position: "top-left",
                });
            } else {
                //item doesn't exist in the cart
                //add item to cart, and append a new property cartQuantity
                const tempProduct = {...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "top-left",
                });
            }

            //save cart to local storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
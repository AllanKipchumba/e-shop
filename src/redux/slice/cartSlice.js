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
        DECREASE_CART: (state, action) => {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            //monitor the initial item quantity
            switch (state.cartItems[productIndex].cartQuantity) {
                case 1:
                    //remove item from cart when quantity is 1
                    const newCartItem = state.cartItems.filter(
                        (item) => item.id !== action.payload.id
                    );
                    //update the new state
                    state.cartItems = newCartItem;

                    toast.success(`${action.payload.name} removed to cart`, {
                        position: "top-left",
                    });
                    break;
                default:
                    //handle all cases when item quantity is > than 1
                    //decrease quantity by 1
                    state.cartItems[productIndex].cartQuantity -= 1;

                    toast.info(`${action.payload.name} was decreased by one`, {
                        position: "top-left",
                    });
                    break;
            }

            //save cart to local storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { ADD_TO_CART, DECREASE_CART } = cartSlice.actions;

export default cartSlice.reducer;
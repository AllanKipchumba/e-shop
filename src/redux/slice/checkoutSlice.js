import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAddress: {},
    billingAddress: {},
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        SAVE_SHIPPING_ADDRESS: (state, action) => {
            state.shippingAddress = action.payload;
        },

        SAVE_BILLING_ADRESS: (state, action) => {
            state.billingAddress = action.payload;
        },
    },
});

export const { SAVE_BILLING_ADRESS, SAVE_SHIPPING_ADDRESS } =
checkoutSlice.actions;

export default checkoutSlice.reducer;
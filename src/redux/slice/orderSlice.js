import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderHistory: [],
    totalOrderAmount: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        STORE_ORDERS: (state, action) => {
            state.orderHistory = action.payload;
        },
        CALC_TOTAL_ORDER_AMOUNT: (state) => {
            const array = [];
            state.orderHistory.map((item) => {
                const { orderAmount } = item;
                return array.push(orderAmount);
            });
            //return total amount
            const totalAmount = array.reduce((a, b) => a + b, 0);

            //update state
            state.totalOrderAmount = totalAmount;
        },
    },
});

export const { STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions;

export default orderSlice.reducer;
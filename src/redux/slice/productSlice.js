import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        STORE_PRODUCTS: (state, action) => {
            state.products = action.payload.products;
        },
        GET_PRICE_RANGE: (state, action) => {
            const { products } = action.payload;
            const array = [];
            products.map((product) => {
                const price = product.price;
                return array.push(price);
            });
            //get the max and min values from the array
            const max = Math.max(...array);
            const min = Math.min(...array);

            state.minPrice = min;
            state.maxPrice = max;
        },
    },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

export default productSlice.reducer;
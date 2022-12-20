import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProduct: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH: (state, action) => {
            const { products, search } = action.payload;
            //search for any product that matches the name or category in the search bar
            const searchedProduct = products.filter(
                (product) =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())
            );
            //update state with the searched product
            state.filteredProduct = searchedProduct;
        },
    },
});

export const { FILTER_BY_SEARCH } = filterSlice.actions;

export default filterSlice.reducer;
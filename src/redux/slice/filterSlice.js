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
        SORT_PRODUCTS: (state, action) => {
            const { products, sort } = action.payload;
            let tempProducts = [];
            switch (sort) {
                case "lowest-price":
                    //products.slice() creates a copy of the products array before sorting is done
                    tempProducts = products.slice().sort((a, b) => {
                        //sort through the products, get the lowest price, display it increasingly
                        return a.price - b.price;
                    });
                    break;
                case "highest-price":
                    tempProducts = products.slice().sort((a, b) => {
                        //sort through the products, get the highest price, display it decreasingly
                        return b.price - a.price;
                    });
                    break;
                case "a-z":
                    tempProducts = products.slice().sort((a, b) => {
                        //sort the products alphabetically from a - z
                        return a.name.localeCompare(b.name);
                    });
                    break;
                case "z-a":
                    tempProducts = products.slice().sort((a, b) => {
                        //sort the products alphabetically from z - a
                        return b.name.localeCompare(a.name);
                    });
                    break;
                    //default returns the latest product first
                default:
                    tempProducts = products;
                    break;
            }
            state.filteredProduct = tempProducts;
        },
        FILTER_BY_CATEGORY: (state, action) => {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === "All") {
                tempProducts = products;
            } else {
                //return products whose category matches category requested by the user
                tempProducts = products.filter(
                    (product) => product.category === category
                );
            }
            state.filteredProduct = tempProducts;
        },
    },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_CATEGORY } =
filterSlice.actions;

export default filterSlice.reducer;
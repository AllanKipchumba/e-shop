import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProducts: [],
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
            state.filteredProducts = searchedProduct;
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
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_CATEGORY: (state, action) => {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === "All") {
                tempProducts = products;
            } else {
                //return products whose category matches category requested from the front-end
                tempProducts = products.filter(
                    (product) => product.category === category
                );
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_BRAND: (state, action) => {
            const { products, brand } = action.payload;
            let tempProducts = [];
            if (brand === "All") {
                tempProducts = products;
            } else {
                //return products whose brand matches brand requested from the front-end
                tempProducts = products.filter((product) => product.brand === brand);
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_PRICE: (state, action) => {
            const { products, price } = action.payload;
            let tempProducts = [];
            //return products whose price range is less or equal to price set from the front-end
            tempProducts = products.filter((product) => product.price <= price);

            state.filteredProducts = tempProducts;
        },
    },
});

export const {
    FILTER_BY_SEARCH,
    SORT_PRODUCTS,
    FILTER_BY_CATEGORY,
    FILTER_BY_BRAND,
    FILTER_BY_PRICE,
} = filterSlice.actions;

export default filterSlice.reducer;
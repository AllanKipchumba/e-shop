import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //actions
        SET_ACTIVE_USER: (state, action) => {
            console.log(action.payload);
        },
    },
});

export const { SET_ACTIVE_USER } = authSlice.actions;

export default authSlice.reducer;
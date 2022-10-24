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
            const { email, userName, userID } = action.payload;

            state.isLoggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userID = userID;
        },
    },
});

export const { SET_ACTIVE_USER } = authSlice.actions;

export default authSlice.reducer;
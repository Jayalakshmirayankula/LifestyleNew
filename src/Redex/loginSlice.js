import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    isValied: false,
    error: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,

    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        loginSuccess: (state) => {
            state.isValied = true;
            state.error = '';
        },
        loginFailure: (state, action) => {
            state.isValied = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isValied = false;
            state.username = '';
            state.password = '';
            state.error = '';
        },
    },
});

export const {setUsername, setPassword, loginSuccess, loginFailure, logout,} = loginSlice.actions;
export default loginSlice.reducer;

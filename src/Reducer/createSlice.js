import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        firstName: '',
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
    },
});

export const { increment, decrement, setFirstName } = counterSlice.actions;
export default counterSlice.reducer;

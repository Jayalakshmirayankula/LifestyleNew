import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLifeStyle = createAsyncThunk('lifestyle/fetchLifeStyle', async () => {
    const response = await axios.get('http://localhost:3001/lifestyle');
    return response.data;
});

const lifestyleSlice = createSlice({
    name: 'lifestyle',
    initialState: {
        lifestyleData: null,
        isPendingLifestyle: false,
        isErrorLifestyle: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLifeStyle.pending, (state) => {
                state.isPendingLifestyle = true;
                state.isErrorLifestyle = false;
            })
            .addCase(fetchLifeStyle.fulfilled, (state, action) => {
                state.isPendingLifestyle = false;
                state.lifestyleData = action.payload;
            })
            .addCase(fetchLifeStyle.rejected, (state) => {
                state.isPendingLifestyle = false;
                state.isErrorLifestyle = true;
            });
    },
});

export default lifestyleSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEarnings = createAsyncThunk('earnings/fetchEarnings', async () => {
    const response = await axios.get('http://localhost:3001/earnings');
    return response.data;
});

const earningsSlice = createSlice({
    name: 'earnings',
    initialState: {
        earningsData: null,
        isPendingEarnings: false,
        isErrorRewardsEarnings: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEarnings.pending, (state) => {
                state.isPendingEarnings = true;
                state.isErrorRewardsEarnings = false;
            })
            .addCase(fetchEarnings.fulfilled, (state, action) => {
                state.isPendingEarnings = false;
                state.earningsData = action.payload;
            })
            .addCase(fetchEarnings.rejected, (state) => {
                state.isPendingEarnings = false;
                state.isErrorRewardsEarnings = true;
            });
    },
});

export default earningsSlice.reducer;

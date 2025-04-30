import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRewards = createAsyncThunk('rewards/fetchRewards', async () => {
    const response = await axios.get('http://localhost:3001/rewards');
    return response.data;
});

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState: {
        rewardData: null,
        isPendingRewards: false,
        isErrorRewards: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRewards.pending, (state) => {
                state.isPendingRewards = true;
                state.isErrorRewards = false;
            })
            .addCase(fetchRewards.fulfilled, (state, action) => {
                state.isPendingRewards = false;
                state.rewardData = action.payload;
            })
            .addCase(fetchRewards.rejected, (state) => {
                state.isPendingRewards = false;
                state.isErrorRewards = true;
            });
    },
});

export default rewardsSlice.reducer;

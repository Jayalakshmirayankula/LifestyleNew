import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../Redex/loginSlice';
import logger from 'redux-logger'
import counterReducer from '../Redex/createSlice';
import lifestyleReducer from '../Redex/lifestyleSlice';
import rewardsReducer from '../Redex/rewardsSlice';
import earningsReducer from '../Redex/earningsSlice';
export default configureStore({
    reducer: {
        login: loginReducer,
        counter: counterReducer,
        lifestyle: lifestyleReducer,
        rewards: rewardsReducer,
        earnings: earningsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});



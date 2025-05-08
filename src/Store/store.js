import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../Reducer/loginSlice';
import logger from 'redux-logger'
import counterReducer from '../Reducer/createSlice';
import lifestyleReducer from '../Reducer/lifestyleSlice';
import rewardsReducer from '../Reducer/rewardsSlice';
import earningsReducer from '../Reducer/earningsSlice';
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



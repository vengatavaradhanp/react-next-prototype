import { configureStore } from '@reduxjs/toolkit';
import { errorMiddleware } from './errorMiddleware';
import authReducer from './authSlice';
import assessmentReducer from './assessmentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        assessment: assessmentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
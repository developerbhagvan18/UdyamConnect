import { configureStore } from '@reduxjs/toolkit';

// placeholder reducers — to be expanded
export const store = configureStore({ reducer: {} });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

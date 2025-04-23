// store.ts
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Bật DevTools khi dev
});

export type RootState = ReturnType<typeof store.getState>; // Lấy RootState từ store
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import prductsReduces from './productsSlice';

const store = configureStore({
  reducer: {
    products: prductsReduces
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
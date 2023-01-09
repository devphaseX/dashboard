import { configureStore } from '@reduxjs/toolkit';
import { globalStateReducer } from './state/global';
import { userApi } from './api/userApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApi } from './api/productApi';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    global: globalStateReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  devTools: !!import.meta.env.DEV,
  middleware: (getDefaults) =>
    getDefaults().concat(userApi.middleware, productApi.middleware),
});

setupListeners(store.dispatch);
type StoreState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export type { StoreState };
export { store, useAppSelector };

import.meta.env.VITE_BACKEND_URL;

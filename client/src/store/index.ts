import { configureStore } from '@reduxjs/toolkit';
import { globalStateReducer } from './state/global';
import { userApi } from './api/userApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApi } from './api/productApi';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { transactionApi } from './api/transaction';
import { geographyApi } from './api/geography';
import { salesApi } from './api/sale';

const store = configureStore({
  reducer: {
    global: globalStateReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [geographyApi.reducerPath]: geographyApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
  },
  devTools: !!import.meta.env.DEV,
  middleware: (getDefaults) =>
    getDefaults().concat(
      userApi.middleware,
      productApi.middleware,
      transactionApi.middleware,
      geographyApi.middleware,
      salesApi.middleware
    ),
});

setupListeners(store.dispatch);
type StoreState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export type { StoreState };
export { store, useAppSelector };

import.meta.env.VITE_BACKEND_URL;

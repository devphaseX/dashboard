import { configureStore } from '@reduxjs/toolkit';
import { globalStateReducer } from './state/global';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: { global: globalStateReducer, [api.reducerPath]: api.reducer },
  middleware: (getDefaults) => getDefaults().concat(api.middleware),
});

setupListeners(store.dispatch);
type StoreState = ReturnType<typeof store.getState>;

export type { StoreState };
export { store };

import.meta.env.VITE_BACKEND_URL;

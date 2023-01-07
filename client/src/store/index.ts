import { configureStore } from '@reduxjs/toolkit';
import { globalStateReducer } from './state/global';

const store = configureStore({ reducer: { global: globalStateReducer } });
type StoreState = ReturnType<typeof store.getState>;

export type { StoreState };
export { store };

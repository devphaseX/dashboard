import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'dark' | 'light';

interface GlobalSharedState {
  themeMode: ThemeMode;
}

const getInitialState = (): GlobalSharedState => ({ themeMode: 'dark' });

const sharedState = createSlice({
  name: 'global',
  initialState: getInitialState(),
  reducers: {
    setMode(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
});

export type { GlobalSharedState };

export const {
  actions: { setMode },
  reducer: globalStateReducer,
} = sharedState;

export default sharedState;

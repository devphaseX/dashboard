import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'dark' | 'light';

interface GlobalSharedState {
  themeMode: ThemeMode;
}

const sharedState = createSlice({
  name: 'global',
  initialState: { themeMode: 'light' } as GlobalSharedState,
  reducers: {
    setMode(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
});

export type { GlobalSharedState };

export const { actions, reducer } = sharedState;
export default sharedState;

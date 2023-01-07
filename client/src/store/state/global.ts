import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'dark' | 'light';

interface GlobalSharedState {
  themeMode: ThemeMode;
  user?: string | null;
}

const getInitialState = (): GlobalSharedState => ({
  themeMode: 'dark',
  user: '63701cc1f03239b7f700000e',
});

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

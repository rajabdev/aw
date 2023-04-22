import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { APP } from '~constants/APP';

interface AppSlice {
	theme: 'light' | 'dark';
	version: string;
}

const initialState: AppSlice = {
	theme: 'dark',
	version: APP.version,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<AppSlice['theme']>) {
			state.theme = action.payload;
		},
		toggleTheme(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
	},
});

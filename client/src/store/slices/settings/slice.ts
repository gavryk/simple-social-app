import { createSlice } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';
import { getTheme } from '../../../utils/getTheme';

const initialState: SettingsSliceTypes = {
	mode: getTheme(),
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setMode: (state) => {
			const newMode = state.mode === 'light' ? 'dark' : 'light';
			state.mode = newMode;
			localStorage.setItem('mode', newMode);
		},
	},
	extraReducers: (builder) => {},
});

export const { setMode } = settingsSlice.actions;
export default settingsSlice.reducer;

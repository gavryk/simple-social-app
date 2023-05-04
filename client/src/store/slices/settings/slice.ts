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
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
	},
	extraReducers: (builder) => {},
});

export const { setMode } = settingsSlice.actions;
export default settingsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';

const initialState: SettingsSliceTypes = {
	mode: 'light',
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

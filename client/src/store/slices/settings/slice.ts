import { createSlice } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';

const initialState: SettingsSliceTypes = {
	mode: 'light',
	isLoaded: 'success',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoaded = action.payload;
		},
	},
	extraReducers: (builder) => {},
});

export const { setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;

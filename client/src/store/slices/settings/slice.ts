import { createSlice } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';

const initialState: SettingsSliceTypes = {
	mode: 'light',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

// export const { setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;

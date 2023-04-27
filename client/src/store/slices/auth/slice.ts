import { createSlice } from '@reduxjs/toolkit';
import { IAuthSliceTypes } from '../../../common';

const initialState: IAuthSliceTypes = {
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

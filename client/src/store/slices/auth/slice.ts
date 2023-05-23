import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthSliceTypes } from '../../../common';

const initialState: IAuthSliceTypes = {
	user: null,
	webSocket: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload;
		},
		setLogout: (state) => {
			state.user = null;
		},
		setSocket: (state, action: PayloadAction<any>) => {
			state.webSocket = action.payload;
		},
	},
});

export const { setAuth, setLogout, setSocket } = authSlice.actions;

export default authSlice.reducer;

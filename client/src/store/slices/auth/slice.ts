import { createSlice } from '@reduxjs/toolkit';
import { IAuthSliceTypes } from '@/common';

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
		setLogout: (state) => {
			state.user = null;
		},
		setNotification: (state, action) => {
			if (state.user) {
				state.user?.notifications?.push(action.payload);
			}
			// if (state.user) {
			// 	state.user = {
			// 		...state.user,
			// 		notifications: [...(state.user.notifications || []), action.payload],
			// 	};
			// }
		},
	},
});

export const { setAuth, setLogout, setNotification } = authSlice.actions;

export default authSlice.reducer;

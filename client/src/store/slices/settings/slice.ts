import { createSlice } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';
import { getTheme } from '../../../utils/getTheme';
import { authSlice } from '../auth/slice';

const initialState: SettingsSliceTypes = {
	mode: getTheme(),
	menu: [
		{
			id: 1,
			title: 'Profile Page',
			icon: 'FiUser',
			link: ``,
		},
		{
			id: 2,
			title: 'Settings',
			icon: 'FiSettings',
			link: `/settings`,
		},
		{
			id: 3,
			title: 'Logout',
			icon: 'FiLogOut',
		},
	],
	mobileMenuActive: false,
	friendsWidget: null,
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
		setMenuActive: (state, action) => {
			state.mobileMenuActive = action.payload;
		},
		setFriendsWidget: (state, action) => {
			state.friendsWidget = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authSlice.actions.setAuth, (state, action) => {
			const user = action.payload;
			state.menu[0].link = `/profile/${user._id}`;
		});
	},
});

export const { setMode, setMenuActive, setFriendsWidget } = settingsSlice.actions;
export default settingsSlice.reducer;

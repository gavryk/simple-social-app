import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const settingsSelector = createSelector(
	(state: RootState) => state.settings.menu,
	(state: RootState) => state.settings.mode,
	(state: RootState) => state.settings.visibleNotification,
	(state: RootState) => state.settings.mobileMenuActive,
	(state: RootState) => state.settings.friendsWidget,
	(menu, mode, visibleNotification, mobileMenuActive, friendsWidget) => {
		return { menu, mode, visibleNotification, mobileMenuActive, friendsWidget };
	},
);

export interface SettingsSliceTypes {
	mode: 'light' | 'dark';
	menu: MenuItem[];
	mobileMenuActive: boolean;
	friendsWidget: 'Followers' | 'Following' | null;
	visibleNotification: boolean;
}

export type MenuItem = {
	id: number;
	title: string;
	icon: any;
	link?: string;
};

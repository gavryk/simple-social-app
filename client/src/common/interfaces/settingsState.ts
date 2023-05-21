export interface SettingsSliceTypes {
	mode: 'light' | 'dark';
	menu: MenuItem[];
	mobileMenuActive: boolean;
	notification: NotificationItem[];
}

export type NotificationItem = {
	type: string;
	senderName: string;
};

export type MenuItem = {
	id: number;
	title: string;
	icon: any;
	link?: string;
};

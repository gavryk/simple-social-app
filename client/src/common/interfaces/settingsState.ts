export interface SettingsSliceTypes {
	mode: 'light' | 'dark';
	menu: MenuItem[];
	mobileMenuActive: boolean;
}

export type MenuItem = {
	id: number;
	title: string;
	icon: any;
	link?: string;
};

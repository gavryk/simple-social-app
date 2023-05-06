export interface SettingsSliceTypes {
	mode: 'light' | 'dark';
	menu: MenuItem[];
}

export type MenuItem = {
	id: number;
	title: string;
	icon: any;
	link?: string;
};

import { ReactNode } from 'react';

export interface Tab {
	title: string;
	content: ReactNode;
}

export interface TabContextProps {
	activeTab: number;
	switchTab: (index: number) => void;
	tabs: Tab[];
}

export interface TabProviderProps {
	children: ReactNode;
	defaultTab: number;
	tabs: Tab[];
}

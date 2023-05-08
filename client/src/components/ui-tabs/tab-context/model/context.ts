import { createContext } from 'react';
import { TabContextProps } from './interfaces';

export const TabContext = createContext<TabContextProps>({
	activeTab: 0,
	switchTab: () => {},
	tabs: [],
});

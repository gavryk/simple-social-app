import { useState } from 'react';
import { TabContext, TabContextProps, TabProviderProps } from './model';

const TabProvider = ({ children, defaultTab, tabs }: TabProviderProps) => {
	const [activeTab, setActiveTab] = useState<number>(defaultTab);

	const switchTab = (index: number) => {
		setActiveTab(index);
	};

	const values: TabContextProps = {
		activeTab,
		switchTab,
		tabs,
	};

	return <TabContext.Provider value={values}>{children}</TabContext.Provider>;
};

export default TabProvider;

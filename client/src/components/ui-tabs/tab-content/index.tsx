import React, { useContext } from 'react';
import { TabContext } from '../tab-context/model';
import styles from './styles.module.scss';

export const TabContent: React.FC = () => {
	const { activeTab, tabs } = useContext(TabContext);
	return <div className={styles.tabContent}>{tabs[activeTab].content}</div>;
};

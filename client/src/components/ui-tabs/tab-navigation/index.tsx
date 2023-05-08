import React, { useContext } from 'react';
import { TabContext } from '../tab-context/model';
import styles from './styles.module.scss';
import clsx from 'clsx';

export const TabNavigation: React.FC = () => {
	const { activeTab, switchTab, tabs } = useContext(TabContext);

	const handleClick = (index: number) => {
		switchTab(index);
	};

	return (
		<div className={styles.tabNavigation}>
			{tabs.map((tab, index) => (
				<div
					key={index}
					className={clsx(styles.tab, { [styles.active]: index === activeTab })}
					onClick={() => handleClick(index)}>
					<span>{tab.title}</span>
				</div>
			))}
		</div>
	);
};

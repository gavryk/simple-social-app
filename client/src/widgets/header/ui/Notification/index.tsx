import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface NotificationProps {
	list?: string[];
}

export const Notifications: React.FC<NotificationProps> = ({ list = [] }) => {
	return (
		<div className={clsx(styles.root, { [styles.hasItems]: list.length > 0 })}>
			{list.length > 0 ? (
				<ul>
					{list.map((item) => (
						<li>{item}</li>
					))}
				</ul>
			) : (
				<div>
					<span>No Notifications</span>
				</div>
			)}
		</div>
	);
};

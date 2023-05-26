import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { UIButton } from '@/components';

interface NotificationProps {
	list?: string[];
}

const clearNotification = () => {
	console.log('Clear');
};

export const Notifications = React.forwardRef<HTMLDivElement, NotificationProps>(
	({ list = [] }, ref) => {
		return (
			<div ref={ref} className={clsx(styles.root, { [styles.hasItems]: list.length > 0 })}>
				{list.length > 0 ? (
					<ul>
						{list.map((item, index) => (
							<li key={`${item}_${index}`}>{item}</li>
						))}
					</ul>
				) : (
					<div>
						<span>No Notifications</span>
					</div>
				)}
				<UIButton fluid color="green" size="xs" onClick={clearNotification}>
					Clear
				</UIButton>
			</div>
		);
	},
);

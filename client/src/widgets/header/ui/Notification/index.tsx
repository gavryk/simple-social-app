import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { UIButton } from '@/components';
import { useUpdateUserMutation } from '@/store/api/users.api';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';

interface NotificationProps {
	list?: string[];
}

export const Notifications = React.forwardRef<HTMLDivElement, NotificationProps>(
	({ list = [] }, ref) => {
		const { user } = useSelector(authSelector);
		const [updateUser] = useUpdateUserMutation();

		const clearNotification = async () => {
			await updateUser({ id: user?._id, notifications: [] });
		};

		return (
			<div
				ref={ref}
				className={clsx(styles.root, {
					[styles.hasItems]: list.length > 0,
					[styles.noItems]: list.length === 0,
				})}>
				{list.length > 0 ? (
					<ul>
						{list.map((item, index) => (
							<li key={`${item}_${index}`}>{item}</li>
						))}
					</ul>
				) : (
					<div className={styles.empty}>
						<span>No Notifications</span>
					</div>
				)}
				{list.length > 0 && (
					<UIButton fluid color="green" size="xs" onClick={clearNotification}>
						Clear
					</UIButton>
				)}
			</div>
		);
	},
);

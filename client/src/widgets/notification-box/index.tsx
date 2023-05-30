import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { UIButton } from '@/components';
import { useUpdateUserMutation } from '@/store/api/users.api';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { settingsSelector } from '@/store/slices/settings/selector';
import { useAppDispatch } from '@/store/store';
import { setVisibleNotification } from '@/store/slices/settings/slice';

interface NotificationProps {
	list?: string[];
}

export const Notifications = React.forwardRef<HTMLDivElement, NotificationProps>(
	({ list = [] }, ref) => {
		const dispatch = useAppDispatch();
		const { user } = useSelector(authSelector);
		const { visibleNotification } = useSelector(settingsSelector);
		const [updateUser] = useUpdateUserMutation();

		const closeNotification = () => {
			dispatch(setVisibleNotification(false));
		};

		const clearNotification = async () => {
			await updateUser({ id: user?._id, notifications: [] });
		};

		return (
			<div
				ref={ref}
				className={clsx(styles.root, {
					[styles.active]: visibleNotification,
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
				<div className={styles.buttons}>
					{list.length > 0 && (
						<UIButton fluid size="xs" onClick={clearNotification}>
							Clear
						</UIButton>
					)}
					<UIButton fluid size="xs" color="orange" onClick={closeNotification}>
						Close
					</UIButton>
				</div>
			</div>
		);
	},
);

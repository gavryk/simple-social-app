import React, { useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { UIButton } from '@/components';
import { useUpdateUserMutation } from '@/store/api/users.api';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { settingsSelector } from '@/store/slices/settings/selector';
import { useAppDispatch } from '@/store/store';
import { setVisibleNotification } from '@/store/slices/settings/slice';
import useClickOutside from '@/hooks/useClickOutside';

interface NotificationProps {
	list?: string[];
}

export const Notifications: React.FC<NotificationProps> = ({ list = [] }) => {
	const dispatch = useAppDispatch();
	const notiRef = useRef<HTMLDivElement>(null);
	const { user } = useSelector(authSelector);
	const { visibleNotification } = useSelector(settingsSelector);
	const [updateUser] = useUpdateUserMutation();

	const memoList = useMemo(
		() => list.map((item, index) => <li key={`${item}_${index}`}>{item}</li>),
		[list],
	);

	useClickOutside(notiRef, () => {
		dispatch(setVisibleNotification(false));
	});

	const closeNotification = () => {
		dispatch(setVisibleNotification(false));
	};

	const clearNotification = async () => {
		await updateUser({ id: user?._id, notifications: [] });
	};

	return (
		<div
			ref={notiRef}
			className={clsx(styles.root, {
				[styles.active]: visibleNotification,
			})}>
			{list.length > 0 ? (
				<ul>{memoList}</ul>
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
};

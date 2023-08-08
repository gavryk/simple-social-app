import React, { useCallback, useEffect } from 'react';
import { MdLightMode, MdNightlight, MdNotifications } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { Link } from 'react-router-dom';
import { setMode, setVisibleNotification } from '@/store/slices/settings/slice';
import { IAuthTypes } from '@/common';

interface AdditionalIconsProps {
	user: IAuthTypes | null;
	mode: 'dark' | 'light';
	visibleNotification: boolean;
}

export const AdditionalIcons: React.FC<AdditionalIconsProps> = ({
	user,
	mode,
	visibleNotification,
}) => {
	const dispatch = useAppDispatch();
	const notiCount = user?.notifications?.length !== undefined ? user?.notifications?.length : 0;

	const handleNotification = useCallback(() => {
		dispatch(setVisibleNotification(!visibleNotification));
	}, []);

	const handleMode = useCallback(() => {
		dispatch(setMode());
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', mode);
	}, [mode]);

	return (
		<div className={styles.root}>
			<Link to="/users" className={styles.icon}>
				<HiUsers size="20" />
			</Link>
			<div className={styles.icon} onClick={handleMode}>
				{mode === 'light' ? <MdLightMode size="20" /> : <MdNightlight size="20" />}
			</div>
			<div className={styles.icon} onClick={handleNotification}>
				{notiCount > 0 && <span className={styles.notificationCount}>{notiCount}</span>}
				<MdNotifications size="20" />
			</div>
		</div>
	);
};

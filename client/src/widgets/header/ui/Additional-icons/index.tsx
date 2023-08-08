import React, { useCallback, useEffect } from 'react';
import { MdLightMode, MdNightlight, MdNotifications } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { settingsSelector } from '@/store/slices/settings/selector';
import { useAppDispatch } from '@/store/store';
import { Link } from 'react-router-dom';
import { authSelector } from '@/store/slices/auth/selector';
import { setMode, setVisibleNotification } from '@/store/slices/settings/slice';

export const AdditionalIcons: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();
	const { mode, visibleNotification } = useSelector(settingsSelector);
	const { user } = useSelector(authSelector);
	const notiCount = user?.notifications?.length !== undefined ? user?.notifications?.length : 0;

	const handleNotification = useCallback(() => {
		dispatch(setVisibleNotification(!visibleNotification));
	}, [dispatch]);

	const handleMode = useCallback(() => {
		dispatch(setMode());
	}, [dispatch]);

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
});

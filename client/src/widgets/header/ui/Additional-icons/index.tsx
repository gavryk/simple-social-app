import React, { useEffect } from 'react';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../../../../store/slices/settings/selector';
import { useAppDispatch } from '../../../../store/store';
import { setMode } from '../../../../store/slices/settings/slice';
import { Link } from 'react-router-dom';

export const AdditionalIcons: React.FC = () => {
	const dispatch = useAppDispatch();
	const { mode } = useSelector(settingsSelector);

	const handleMode = () => {
		dispatch(setMode());
	};

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
		</div>
	);
};

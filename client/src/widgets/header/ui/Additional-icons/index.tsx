import React, { useEffect } from 'react';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../../../../store/slices/settings/selector';
import { useAppDispatch } from '../../../../store/store';
import { setMode } from '../../../../store/slices/settings/slice';
import { useLocalStorage } from '../../../../hooks';

export const AdditionalIcons: React.FC = () => {
	const dispatch = useAppDispatch();
	const { mode } = useSelector(settingsSelector);

	useEffect(() => {
		localStorage.setItem('mode', mode);
	}, [mode]);

	const handleMode = () => {
		dispatch(setMode());
	};

	return (
		<div className={styles.root}>
			<div className={styles.icon} onClick={handleMode}>
				{mode === 'light' ? <MdLightMode size="20" /> : <MdNightlight size="20" />}
			</div>
		</div>
	);
};

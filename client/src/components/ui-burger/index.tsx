import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useAppDispatch } from '../../store/store';
import { settingsSelector } from '../../store/slices/settings/selector';
import { setMenuActive } from '../../store/slices/settings/slice';

export const UIBurger: React.FC = () => {
	const dispatch = useAppDispatch();
	const { mobileMenuActive } = useSelector(settingsSelector);

	const burgerHandler = () => {
		dispatch(setMenuActive(!mobileMenuActive));
	};

	return (
		<div
			className={clsx(styles.root, { [styles.active]: mobileMenuActive })}
			onClick={burgerHandler}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

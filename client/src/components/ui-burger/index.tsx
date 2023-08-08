import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { RootState, useAppDispatch } from '../../store/store';
import { setMenuActive } from '../../store/slices/settings/slice';

export const UIBurger: React.FC = () => {
	const dispatch = useAppDispatch();
	const mobileMenuActive = useSelector((state: RootState) => state.settings.mobileMenuActive);

	const burgerHandler = () => {
		dispatch(setMenuActive(!mobileMenuActive));
	};

	return (
		<div
			className={clsx(styles.root, { [styles.active]: mobileMenuActive })}
			onClick={burgerHandler}
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

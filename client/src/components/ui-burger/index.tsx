import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useAppDispatch } from '../../store/store';

export const UIBurger: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={clsx(styles.root)}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

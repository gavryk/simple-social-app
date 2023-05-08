import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface BoxType {
	children: React.ReactNode;
	verticalSpaceNone?: boolean;
}

export const UIBox: React.FC<BoxType> = ({ children, verticalSpaceNone = false }) => {
	return (
		<div className={clsx(styles.root, { [styles.vSpaceOff]: verticalSpaceNone })}>{children}</div>
	);
};

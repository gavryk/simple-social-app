import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface BoxType {
	children: React.ReactNode;
	spaceNone?: boolean;
}

export const UIBox: React.FC<BoxType> = ({ children, spaceNone = false }) => {
	return <div className={clsx(styles.root, { [styles.spaceOff]: spaceNone })}>{children}</div>;
};

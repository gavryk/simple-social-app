import React from 'react';
import styles from './styles.module.scss';

interface BoxType {
	children: React.ReactNode;
}

export const UIBox: React.FC<BoxType> = ({ children }) => {
	return <div className={styles.root}>{children}</div>;
};

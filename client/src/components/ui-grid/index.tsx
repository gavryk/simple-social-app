import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface GridProps {
	children: React.ReactNode;
	columns: number;
	gridGap: number;
	centerBig?: boolean;
}

export const UIGrid = ({ children, columns, gridGap, centerBig = false }: GridProps) => {
	const gridWrapperClasses = useMemo(() => {
		return clsx(styles.gridWrapper, {
			[styles[`gridColumns${columns}`]]: columns,
			[styles[`gridGap${gridGap}`]]: gridGap,
			[styles.centerBig]: centerBig,
		});
	}, [columns, gridGap]);

	return <div className={gridWrapperClasses}>{children}</div>;
};

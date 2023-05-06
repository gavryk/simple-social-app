import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface GridProps {
	children: React.ReactNode;
	columns: number;
	gridGap: number;
}

export const UIGrid = ({ children, columns, gridGap }: GridProps) => {
	const gridWrapperClasses = useMemo(() => {
		return clsx(styles.gridWrapper, {
			[styles[`gridColumns${columns}`]]: columns,
			[styles[`gridGap${gridGap}`]]: gridGap,
		});
	}, [columns, gridGap]);

	return <div className={gridWrapperClasses}>{children}</div>;
};

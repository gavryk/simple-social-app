import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface GridProps {
	children: React.ReactNode;
	columns: number;
	gridGap: number;
}

export const UIGrid = ({ children, columns, gridGap }: GridProps) => {
	const optionsStyle = useMemo(() => {
		return `
      .${styles.gridWrapper} {
        --grid--gap: var(--base--spaces--${gridGap});
        --grid--count: ${columns};
      }
    `;
	}, [columns, gridGap]);
	return (
		<>
			<style jsx="true">{optionsStyle}</style>
			<div className={clsx(styles.gridWrapper)}>{children}</div>
		</>
	);
};

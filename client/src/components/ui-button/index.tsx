import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
	children: React.ReactNode;
	active?: boolean;
	fluid?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	color?: 'orange' | 'black' | 'red' | 'green' | 'purple' | 'bordo' | 'blue';
	variants?: 'contained' | 'outlined' | 'text';
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

export const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			active,
			color = 'green',
			size = 'md',
			variants = 'contained',
			type = 'button',
			onClick,
			fluid,
			disabled,
		},
		ref,
	) => {
		return (
			<button
				disabled={disabled}
				ref={ref}
				type={type}
				onClick={onClick}
				className={clsx(styles.uibutton, styles[variants], styles[size], {
					[styles.black]: color === 'black',
					[styles.red]: color === 'red',
					[styles.green]: color === 'green',
					[styles.orange]: color === 'orange',
					[styles.bordo]: color === 'bordo',
					[styles.purple]: color === 'purple',
					[styles.blue]: color === 'blue',
					[styles.active]: active,
					[styles.fluid]: fluid,
				})}>
				{children}
			</button>
		);
	},
);

import { AiOutlineSearch } from 'react-icons/ai';
import clsx from 'clsx';
import React, { InputHTMLAttributes } from 'react';
import { UILabel } from '../ui-label';
import styles from './styles.module.scss';

interface InputProps {
	label?: string;
	id?: string;
	type: React.HTMLInputTypeAttribute;
	required?: InputHTMLAttributes<HTMLInputElement>['required'];
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	name?: string;
	value?: string | number;
	error?: string | boolean;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onInput?: React.FormEventHandler<HTMLInputElement>;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	checked?: boolean;
}

export const UIInput = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			id,
			type,
			required,
			onBlur,
			name,
			placeholder,
			value,
			onChange,
			onInput,
			onClick,
			error,
			checked,
		},
		ref,
	) => {
		return (
			<div className={clsx(styles.UIInput, styles[type])}>
				{label && type !== 'radio' && type !== 'checkbox' && (
					<UILabel htmlFor={id ? id : ''}>{label}</UILabel>
				)}
				<input
					id={id}
					type={type}
					onBlur={onBlur}
					name={name}
					required={required}
					onChange={onChange}
					onInput={onInput}
					placeholder={placeholder}
					onClick={onClick}
					value={value}
					className={clsx(styles.input, { [styles.error]: error })}
					ref={ref}
					checked={checked}
				/>
				{label && (type === 'radio' || type === 'checkbox') && (
					<UILabel htmlFor={id ? id : ''}>{label}</UILabel>
				)}
				{type === 'search' && <AiOutlineSearch size="20" />}
				{error && <span className={styles.errorTxt}>{error}</span>}
			</div>
		);
	},
);

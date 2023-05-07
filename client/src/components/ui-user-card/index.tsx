import React from 'react';
import { UIBox } from '../ui-box';
import { IAuthTypes } from '@/common';
import { UIAvatar } from '../ui-avatar';
import styles from './styles.module.scss';
import { UITypography } from '../ui-typography';
import { Link } from 'react-router-dom';

export const UIUserCard: React.FC<IAuthTypes> = ({
	_id,
	firstName,
	lastName,
	picturePath,
	occupation,
	location,
}) => {
	return (
		<UIBox>
			<div className={styles.card}>
				<Link to={`/profile/${_id}`} className={styles.thumbnail}>
					<UIAvatar src={picturePath} alt={`${firstName}_${lastName}`} />
				</Link>
				<UITypography variant="h5" textAlign="center" bottomSpace="xsm" fontWeight="bold">
					{firstName} {lastName}
				</UITypography>
				<UITypography variant="span" textAlign="center" bottomSpace="xsm">
					{occupation}
				</UITypography>
				<UITypography variant="span" textAlign="center" bottomSpace="xsm">
					{location}
				</UITypography>
			</div>
		</UIBox>
	);
};

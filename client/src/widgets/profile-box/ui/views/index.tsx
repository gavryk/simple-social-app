import React from 'react';
import { IAuthTypes } from '../../../../common';
import styles from './styles.module.scss';

type ProfileViewsProps = Pick<IAuthTypes, 'viewedProfile' | 'impressions'>;

export const ProfileViews: React.FC<ProfileViewsProps> = ({ viewedProfile, impressions }) => {
	return (
		<div className={styles.root}>
			<div className={styles.row}>
				<span>Viewed profile</span>
				<span>{viewedProfile}</span>
			</div>
			<div className={styles.row}>
				<span>Impressions of Posts</span>
				<span>{impressions}</span>
			</div>
		</div>
	);
};

import React from 'react';
import { IAuthTypes } from '../../../../common';
import styles from './styles.module.scss';

type ProfileViewsProps = Pick<IAuthTypes, 'viewedProfile' | 'impressions'>;

export const ProfileViews: React.FC<ProfileViewsProps> = ({ viewedProfile, impressions }) => {
	return (
		<div className={styles.root}>
			<div className={styles.row}>
				{viewedProfile && (
					<>
						<span>Viewed your profile</span>
						<span>{viewedProfile}</span>
					</>
				)}
			</div>
			<div className={styles.row}>
				{impressions && (
					<>
						<span>Impressions of your Posts</span>
						<span>{impressions}</span>
					</>
				)}
			</div>
		</div>
	);
};

import React from 'react';
import { IAuthTypes } from '../../../../common';
import styles from './styles.module.scss';
import { useSocialIcons } from './model';
import { UITypography } from '../../../../components';

type ProfileSocialProps = Pick<IAuthTypes, 'social'>;

export const ProfileSocial: React.FC<ProfileSocialProps> = ({ social }) => {
	return (
		<div className={styles.root}>
			{social?.map((item, index) => {
				const Icon = useSocialIcons(item.name);
				return (
					<a
						href={item.link}
						target="_blank"
						key={`${item.link}_${index}`}
						className={styles.socialRow}>
						{Icon}
						{item.name}
					</a>
				);
			})}
		</div>
	);
};

import React from 'react';
import { IAuthTypes } from '../../../../common';
import styles from './styles.module.scss';
import { useSocialIcons } from '@/hooks/useSocialIcon';
import clsx from 'clsx';

type ProfileSocialProps = Pick<IAuthTypes, 'social'>;

export const ProfileSocial: React.FC<ProfileSocialProps> = ({ social }) => {
	return (
		<div className={styles.root}>
			{social?.map((item, index) => {
				const Icon = useSocialIcons(item.name, '18');
				return (
					<a
						href={item.link}
						target="_blank"
						key={`${item.link}_${index}`}
						className={clsx(styles.socialIcon, styles[item.name.toLowerCase()])}>
						{Icon}
					</a>
				);
			})}
		</div>
	);
};

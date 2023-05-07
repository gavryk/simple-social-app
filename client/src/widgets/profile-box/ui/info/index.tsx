import React from 'react';
import { IAuthTypes } from '../../../../common';
import styles from './styles.module.scss';
import { MdEmail, MdWork } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';

type ProfileInfo = Pick<IAuthTypes, 'email' | 'location' | 'occupation'>;

export const ProfileInfo: React.FC<ProfileInfo> = ({ email, location, occupation }) => {
	return (
		<div className={styles.profileInfoList}>
			<div className={styles.info}>
				<MdEmail size="20" />
				<span>{email}</span>
			</div>
			<div className={styles.info}>
				<ImLocation2 size="20" />
				<span>{location}</span>
			</div>
			<div className={styles.info}>
				<MdWork size="20" />
				<span>{occupation}</span>
			</div>
		</div>
	);
};

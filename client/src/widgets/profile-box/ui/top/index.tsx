import React from 'react';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIAvatar } from '@/components';

interface ProfileTopType {
	admin: boolean;
	photo?: string;
	name: string;
	friendsCount?: number;
}

export const ProfileBoxTop: React.FC<ProfileTopType> = ({
	admin,
	photo,
	name,
	friendsCount = 0,
}) => {
	return (
		<div className={styles.rootTop}>
			<div className={styles.userInfo}>
				<UIAvatar src={photo} alt={name} />
				<div className={styles.userName}>
					<span className={styles.name}>{name}</span>
					<span className={styles.friends}>{friendsCount} Friends</span>
				</div>
			</div>
			{admin && (
				<div className={styles.userSettings}>
					<Link to="/settings">
						<RiUserSettingsFill size="20" />
					</Link>
				</div>
			)}
		</div>
	);
};

import React from 'react';
import { RiUserSettingsFill } from 'react-icons/ri';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface ProfileTopType {
	photo?: string;
	name: string;
	friendsCount?: number;
}

export const ProfileBoxTop: React.FC<ProfileTopType> = ({ photo, name, friendsCount = 0 }) => {
	return (
		<div className={styles.rootTop}>
			<div className={styles.userInfo}>
				<div className={styles.userPhoto}>
					{photo && <img src={`${import.meta.env.VITE_BASE_URL}${photo}`} alt={name} />}
				</div>
				<div className={styles.userName}>
					<span className={styles.name}>{name}</span>
					<span className={styles.friends}>{friendsCount} Friends</span>
				</div>
			</div>
			<div className={styles.userSettings}>
				<Link to="/settings">
					<RiUserSettingsFill size="20" />
				</Link>
			</div>
		</div>
	);
};

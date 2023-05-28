import React from 'react';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIAvatar } from '@/components';
import { setFriendsWidget } from '@/store/slices/settings/slice';
import { useAppDispatch } from '@/store/store';

interface ProfileTopType {
	admin: boolean;
	photo?: string;
	name: string;
	followingCount?: number;
	followersCount?: number;
}

export const ProfileBoxTop: React.FC<ProfileTopType> = ({
	admin,
	photo,
	name,
	followingCount = 0,
	followersCount = 0,
}) => {
	const dispatch = useAppDispatch();
	const setFriendsWidgetType = (type: string) => {
		dispatch(setFriendsWidget(type));
	};
	return (
		<div className={styles.rootTop}>
			<div className={styles.userInfo}>
				<UIAvatar src={photo} alt={name} />
				<div className={styles.userName}>
					<span className={styles.name}>{name}</span>
					<span className={styles.friends} onClick={() => setFriendsWidgetType('Following')}>
						{followingCount} Following
					</span>
					<span className={styles.friends} onClick={() => setFriendsWidgetType('Followers')}>
						{followersCount} Followers
					</span>
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

import React from 'react';
import { UIBox } from '@/components/ui-box';
import { IAuthTypes } from '@/common';
import styles from './styles.module.scss';
import { ProfileBoxTop, ProfileInfo, ProfileViews } from './ui';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { UISocialMedia } from '@/components';

interface UserBox {
	user: IAuthTypes | null;
}

export const ProfileBox: React.FC<UserBox> = ({ user }) => {
	const { user: admin } = useSelector(authSelector);
	return (
		<UIBox>
			<div className={styles.profileRow}>
				<ProfileBoxTop
					admin={admin?._id === user?._id}
					photo={user?.picturePath}
					name={`${user?.firstName} ${user?.lastName}`}
					followersCount={user?.followers.length}
					followingCount={user?.following.length}
				/>
			</div>
			<div className={styles.profileRow}>
				{user && (
					<ProfileInfo
						email={user?.email}
						location={user?.location}
						occupation={user?.occupation}
					/>
				)}
			</div>
			<div className={styles.profileRow}>
				{user && <ProfileViews viewedProfile={user.viewedProfile} impressions={user.impressions} />}
			</div>
			{user?.social && user?.social?.length > 0 && <UISocialMedia social={user?.social} />}
		</UIBox>
	);
};

import React from 'react';
import { UIBox } from '@/components/ui-box';
import { IAuthTypes } from '@/common';
import styles from './styles.module.scss';
import { ProfileBoxTop, ProfileInfo, ProfileSocial, ProfileViews } from './ui';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';

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
					friendsCount={user?.friends.length}
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
			{admin?._id === user?._id && (
				<div className={styles.profileRow}>
					{user && (
						<ProfileViews viewedProfile={user.viewedProfile} impressions={user.impressions} />
					)}
				</div>
			)}
			<ProfileSocial social={user?.social} />
		</UIBox>
	);
};

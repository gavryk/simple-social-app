import React from 'react';
import { UIBox } from '../../components/ui-box';
import { IAuthTypes } from '../../common';
import styles from './styles.module.scss';
import { ProfileBoxTop } from './ui';

interface UserBox {
	user: IAuthTypes | null;
}

export const ProfileBox: React.FC<UserBox> = ({ user }) => {
	return (
		<UIBox>
			<div className={styles.profileRow}>
				<ProfileBoxTop
					photo={user?.picturePath}
					name={`${user?.firstName} ${user?.lastName}`}
					friendsCount={user?.friends.length}
				/>
			</div>
		</UIBox>
	);
};

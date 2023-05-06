import React from 'react';
import { UIBox } from '../../components/ui-box';
import { IAuthTypes } from '../../common';
import styles from './styles.module.scss';

interface UserBox {
	user: IAuthTypes | null;
}

export const ProfileBox: React.FC<UserBox> = ({ user }) => {
	return (
		<UIBox>
			<div className={styles.rootTop}>
				<div className={styles.userInfo}>
					<div className={styles.userPhoto}>
						<img
							src={`${import.meta.env.VITE_BASE_URL}${user?.picturePath}`}
							alt={user?.firstName}
						/>
					</div>
				</div>
			</div>
		</UIBox>
	);
};

import React from 'react';
import styles from './styles.module.scss';
import { BiUserMinus, BiUserPlus } from 'react-icons/bi';
import { UIAvatar } from '@/components';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
interface FriendProp {
	firstName: string;
	lastName: string;
	picturePath: string;
	setup?: { userId: string; friendsWidget: string | null };
}

export const FriendRow: React.FC<FriendProp> = ({ firstName, lastName, picturePath, setup }) => {
	const { user } = useSelector(authSelector);

	return (
		<div className={styles.root}>
			<div className={styles.left}>
				<UIAvatar src={picturePath} alt={`${firstName}_${lastName}`} />
				<div className={styles.info}>
					<span className={styles.name}>
						{firstName} {lastName}
					</span>
				</div>
			</div>
			{user?._id === setup?.userId && (
				<div className={styles.right}>
					{setup?.friendsWidget === 'Followers' ? (
						<BiUserPlus size="20" />
					) : (
						<BiUserMinus size="20" />
					)}
				</div>
			)}
		</div>
	);
};

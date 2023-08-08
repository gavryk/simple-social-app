import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { BiUserMinus, BiUserPlus } from 'react-icons/bi';
import { UIAvatar } from '@/components';
import { useSelector } from 'react-redux';
import { useSocket } from '@/context';
import { FriendProp } from '@/common/interfaces/friendsTypes';
import { Link } from 'react-router-dom';
import { RootState } from '@/store/store';

export const FriendRow: React.FC<FriendProp> = ({ _id, firstName, lastName, picturePath }) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const isFollow = useMemo(() => user?.following.some((u) => u === _id), [user, _id]);
	const { toggleUpdateFriends } = useSocket();

	const handleUpdateFriends = () => {
		const receiver = { _id, firstName, lastName };
		toggleUpdateFriends({ sender: user, receiver, isFollow });
	};

	return (
		<div className={styles.root}>
			<Link to={`/profile/${_id}`} className={styles.left}>
				<UIAvatar src={picturePath} alt={`${firstName}_${lastName}`} />
				<div className={styles.info}>
					<span className={styles.name}>
						{firstName} {lastName}
					</span>
				</div>
			</Link>
			<div className={styles.right}>
				<div className={styles.icon} onClick={handleUpdateFriends}>
					{isFollow ? <BiUserMinus size="18" /> : <BiUserPlus size="18" />}
				</div>
			</div>
		</div>
	);
};

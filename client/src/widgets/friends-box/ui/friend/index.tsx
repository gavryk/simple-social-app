import React from 'react';
import styles from './styles.module.scss';
import { BiUserMinus, BiUserPlus } from 'react-icons/bi';
import { UIAvatar } from '@/components';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useSocket } from '@/context';
import { useUpdateFriendsMutation } from '@/store/api/users.api';
import { FriendProp } from '@/common/interfaces/friendsTypes';
import { Link } from 'react-router-dom';

export const FriendRow: React.FC<FriendProp> = ({ _id, firstName, lastName, picturePath }) => {
	const { user } = useSelector(authSelector);
	const [updateFriends] = useUpdateFriendsMutation();
	const isFollow = user?.following.some((u) => u === _id);
	const { socket } = useSocket();

	const toggleUpdateFriends = async () => {
		await updateFriends({ id: user?._id, friendId: _id }).then(() => {
			socket?.emit('sendNotification', {
				receiver: { id: _id, name: `${firstName} ${lastName}` },
				sender: { id: user?._id, name: `${user?.firstName} ${user?.lastName}` },
				type: !isFollow ? 'follow' : 'unfollow',
			});
		});
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
				<div className={styles.icon} onClick={toggleUpdateFriends}>
					{isFollow ? <BiUserMinus size="18" /> : <BiUserPlus size="18" />}
				</div>
			</div>
		</div>
	);
};

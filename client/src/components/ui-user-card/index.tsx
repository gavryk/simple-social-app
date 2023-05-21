import React, { useEffect, useRef, useState } from 'react';
import { UIBox } from '../ui-box';
import { IAuthTypes } from '@/common';
import { UIAvatar } from '../ui-avatar';
import styles from './styles.module.scss';
import { UITypography } from '../ui-typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useUpdateFriendsMutation } from '@/store/api/users.api';
import { UIButton } from '../ui-button';

interface CardPropsTypes extends IAuthTypes {
	webSocket: any;
}

export const UIUserCard: React.FC<CardPropsTypes> = ({
	_id,
	firstName,
	lastName,
	picturePath,
	occupation,
	location,
	webSocket,
}) => {
	const { user } = useSelector(authSelector);
	const isFriend = user?.following.find((friend) => friend === _id);
	const [updateFriends] = useUpdateFriendsMutation();

	const [notifications, setNotifications] = useState<any[]>([]);

	useEffect(() => {
		webSocket.on('getNotification', (data: any) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, [webSocket]);

	const toggleUpdateFriends = async () => {
		await updateFriends({ id: user?._id, friendId: _id });
		const message = JSON.stringify({
			followerName: `${user?.firstName} ${user?.lastName}`,
			userName: `${firstName} ${lastName}`,
			type: !isFriend ? 'follow' : 'unfollow',
		});
		webSocket.emit('sendNotification', {
			receiverName: `${firstName} ${lastName}`,
			senderName: `${user?.firstName} ${user?.lastName}`,
			type: !isFriend ? 'follow' : 'unfollow',
		});
	};

	return (
		<UIBox>
			<div className={styles.card}>
				<Link to={`/profile/${_id}`} className={styles.thumbnail}>
					<UIAvatar src={picturePath} alt={`${firstName}_${lastName}`} />
				</Link>
				<UITypography variant="h5" textAlign="center" bottomSpace="xsm" fontWeight="bold">
					{firstName} {lastName}
				</UITypography>
				<UITypography variant="span" textAlign="center" bottomSpace="xsm">
					{occupation}
				</UITypography>
				<UITypography variant="span" textAlign="center" bottomSpace="xsm">
					{location}
				</UITypography>
				<UIButton
					size="sm"
					centered
					color={`${isFriend ? 'orange' : 'green'}`}
					onClick={toggleUpdateFriends}>
					{!isFriend ? 'Follow' : 'Unfollow'}
				</UIButton>
			</div>
		</UIBox>
	);
};

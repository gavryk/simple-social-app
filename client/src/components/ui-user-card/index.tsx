import React from 'react';
import { UIBox } from '../ui-box';
import { IAuthTypes } from '@/common';
import { UIAvatar } from '../ui-avatar';
import styles from './styles.module.scss';
import { UITypography } from '../ui-typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { UIButton } from '../ui-button';
interface CardPropTypes extends IAuthTypes {
	handleSocketMessage: any;
}

export const UIUserCard: React.FC<CardPropTypes> = ({
	_id,
	firstName,
	lastName,
	picturePath,
	occupation,
	location,
	handleSocketMessage,
}) => {
	const { user } = useSelector(authSelector);
	const isFriend = user?.following.find((friend) => friend === _id);

	const updFriends = () => {
		handleSocketMessage({
			sender: user,
			receiver: { _id, firstName, lastName },
			isFollow: isFriend ? true : false,
		});
	};

	return (
		<UIBox>
			<div className={styles.card}>
				<Link to={`/profile/${_id}`} className={styles.thumbnail}>
					<UIAvatar src={picturePath} alt={`${firstName}_${lastName}`} />
				</Link>
				<div className={styles.info}>
					<UITypography variant="h5" textAlign="center" bottomSpace="xsm" fontWeight="bold">
						{firstName} {lastName}
					</UITypography>
					<UITypography variant="span" textAlign="center" bottomSpace="xsm">
						{occupation}
					</UITypography>
					<UITypography variant="span" textAlign="center" bottomSpace="xsm">
						{location}
					</UITypography>
					<div className={styles.button}>
						<UIButton
							size="sm"
							centered
							color={`${isFriend ? 'orange' : 'main'}`}
							onClick={updFriends}>
							{!isFriend ? 'Follow' : 'Unfollow'}
						</UIButton>
					</div>
				</div>
			</div>
		</UIBox>
	);
};

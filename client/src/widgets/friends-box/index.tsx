import { UIBox, UILoader, UITypography } from '@/components';
import { settingsSelector } from '@/store/slices/settings/selector';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FriendRow } from './ui';
import { useGetFollowersQuery, useGetFollowingQuery } from '@/store/api/users.api';
import styles from './styles.module.scss';

interface FriendsBoxProps {
	userId?: string;
}

export const FriendsBox: React.FC<FriendsBoxProps> = ({ userId }) => {
	const { friendsWidget } = useSelector(settingsSelector);
	const [friendsList, setFriendsList] = useState<any[]>([]);
	const { data: followersData, isLoading: followersLoading } = useGetFollowersQuery(userId, {
		skip: friendsWidget !== 'Followers',
	});
	const { data: followingData, isLoading: followingLoading } = useGetFollowingQuery(userId, {
		skip: friendsWidget !== 'Following',
	});

	useEffect(() => {
		if (friendsWidget === 'Followers' && followersData) {
			setFriendsList(followersData);
		} else if (friendsWidget === 'Following' && followingData) {
			setFriendsList(followingData);
		}
	}, [friendsWidget, followersData, followingData]);

	return (
		<>
			{friendsWidget && (
				<UIBox>
					{!followersLoading && !followingLoading ? (
						<>
							<UITypography variant="h5" textAlign="center" bottomSpace="xsm">
								{friendsWidget}
							</UITypography>
							<div className={styles.list}>
								{friendsList.map((friend) => (
									<FriendRow key={friend._id} {...friend} />
								))}
							</div>
						</>
					) : (
						<UILoader />
					)}
				</UIBox>
			)}
		</>
	);
};

import { UIBox, UILoader, UITypography } from '@/components';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FriendRow } from './ui';
import { useGetFollowersQuery, useGetFollowingQuery } from '@/store/api/users.api';
import styles from './styles.module.scss';
import { RootState } from '@/store/store';

interface FriendsBoxProps {
	userId?: string;
}

export const FriendsBox: React.FC<FriendsBoxProps> = ({ userId }) => {
	const friendsWidget = useSelector((state: RootState) => state.settings.friendsWidget);
	const { data: followersData, isLoading: followersLoading } = useGetFollowersQuery(userId, {
		skip: friendsWidget !== 'Followers',
	});
	const { data: followingData, isLoading: followingLoading } = useGetFollowingQuery(userId, {
		skip: friendsWidget !== 'Following',
	});

	const friendsList = useMemo(() => {
		if (friendsWidget === 'Followers' && followersData) {
			return followersData;
		} else if (friendsWidget === 'Following' && followingData) {
			return followingData;
		}
		return [];
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
							{friendsList.length > 0 ? (
								<div className={styles.list}>
									{friendsList.map((friend: any) => (
										<FriendRow key={friend._id} {...friend} />
									))}
								</div>
							) : (
								<UITypography variant="body" textAlign="left" bottomSpace="xsm">
									{friendsWidget} List is Empty.
								</UITypography>
							)}
						</>
					) : (
						<UILoader />
					)}
				</UIBox>
			)}
		</>
	);
};

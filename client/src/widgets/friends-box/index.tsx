import { UIBox, UITypography } from '@/components';
import { settingsSelector } from '@/store/slices/settings/selector';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FriendRow } from './ui';

interface FriendsBoxProps {
	userId?: string;
}

export const FriendsBox: React.FC<FriendsBoxProps> = ({ userId }) => {
	const { friendsWidget } = useSelector(settingsSelector);
	const [friendsList, setFriendsList] = useState(['']);

	useEffect(() => {}, [friendsWidget]);

	return (
		<>
			{friendsWidget && (
				<UIBox>
					<UITypography variant="h5" textAlign="center">
						{friendsWidget}
					</UITypography>
					{friendsList.map((friend) => (
						<FriendRow id={friend} />
					))}
				</UIBox>
			)}
		</>
	);
};

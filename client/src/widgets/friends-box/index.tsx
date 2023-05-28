import { UIBox, UITypography } from '@/components';
import { settingsSelector } from '@/store/slices/settings/selector';
import React from 'react';
import { useSelector } from 'react-redux';

interface FriendsBoxProps {
	userId?: string;
}

export const FriendsBox: React.FC<FriendsBoxProps> = ({ userId }) => {
	const { friendsWidget } = useSelector(settingsSelector);
	return (
		<>
			{friendsWidget && (
				<UIBox>
					<UITypography variant="h5" textAlign="center">
						{friendsWidget}
					</UITypography>
				</UIBox>
			)}
		</>
	);
};

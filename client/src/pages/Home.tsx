import React from 'react';
import { UIGrid } from '@/components';
import { FriendsBox, ProfileBox } from '@/widgets';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';

export const Home: React.FC = () => {
	const { user } = useSelector(authSelector);

	return (
		<UIGrid columns={3} centerBig="md" gridGap={4}>
			<div className="col">
				<ProfileBox user={user} />
				<FriendsBox userId={user?._id} />
			</div>
		</UIGrid>
	);
};

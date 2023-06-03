import { UIGrid, UILoader } from '@/components';
import { useGetUserQuery } from '@/store/api/users.api';
import { FriendsBox, ProfileBox } from '@/widgets';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Profile: React.FC = () => {
	const { userId } = useParams();
	const { data, isLoading, isError, refetch } = useGetUserQuery(userId);

	useEffect(() => {
		refetch();
	}, []);

	if (isLoading) return <UILoader />;

	return (
		<UIGrid columns={2} centerBig="sm" gridGap={4}>
			<div className="col">
				<ProfileBox user={data} />
				<FriendsBox userId={userId} />
			</div>
		</UIGrid>
	);
};

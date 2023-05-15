import { UILoader } from '@/components';
import { useGetUserQuery } from '@/store/api/users.api';
import { ProfileBox } from '@/widgets';
import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile: React.FC = () => {
	const { userId } = useParams();
	const { data, isLoading, isError } = useGetUserQuery(userId);

	if (isLoading) return <UILoader />;

	return (
		<div>
			<ProfileBox user={data} />
		</div>
	);
};

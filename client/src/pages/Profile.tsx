import { UILoader } from '@/components';
import { useGetUserQuery } from '@/store/api/users.api';
import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile: React.FC = () => {
	const { userId } = useParams();
	const { data, isLoading, isError } = useGetUserQuery(userId);

	if (isLoading) return <UILoader />;

	return (
		<div>
			<h1>User: {data.firstName}</h1>
		</div>
	);
};

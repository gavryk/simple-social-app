import React from 'react';
import { UILoader } from '../components';
import { useGetAllUserQuery } from '../store/api/users.api';
import { IAuthTypes } from '../common';

export const Users: React.FC = () => {
	const { data, isLoading, isError } = useGetAllUserQuery();

	if (isLoading) return <UILoader />;

	return (
		<div>
			{data?.map((user: IAuthTypes) => (
				<div>{user.firstName}</div>
			))}
		</div>
	);
};

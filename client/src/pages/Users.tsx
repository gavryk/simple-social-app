import React from 'react';
import { UIBox, UIGrid, UILoader, UIUserCard } from '@/components';
import { useGetAllUserQuery } from '@/store/api/users.api';
import { IAuthTypes } from '@/common';

type UserPropsType = {
	webSocket: any;
};

export const Users: React.FC<UserPropsType> = ({ webSocket }) => {
	const { data, isLoading, isError } = useGetAllUserQuery();

	if (isLoading) return <UILoader />;
	if (isError) return <h2>Something went wrong, please try again later</h2>;

	return (
		<UIGrid columns={4} gridGap={4}>
			{data?.map((user: IAuthTypes) => (
				<UIUserCard {...user} key={user._id} webSocket={webSocket} />
			))}
		</UIGrid>
	);
};

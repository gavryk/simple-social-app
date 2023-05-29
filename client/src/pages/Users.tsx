import React, { useState } from 'react';
import { UIGrid, UILoader, UIPagination, UIUserCard } from '@/components';
import { useGetAllUserQuery } from '@/store/api/users.api';
import { IAuthTypes, updateFriendsSocket } from '@/common';
import { useSocket } from '@/context';

export const Users: React.FC = () => {
	const [page, setPage] = useState(0);
	const { data, isLoading, isError } = useGetAllUserQuery(page);
	const { toggleUpdateFriends } = useSocket();

	const handleUpdateFriends = ({ sender, receiver, isFollow }: updateFriendsSocket) => {
		toggleUpdateFriends({ sender, receiver, isFollow });
	};

	const changePage = (num: number) => {
		setPage(num);
		window.scrollTo(0, 0);
	};

	if (isLoading) return <UILoader />;
	if (isError) return <h2>Something went wrong, please try again later</h2>;

	return (
		<>
			<UIGrid columns={4} gridGap={4}>
				{data?.users.map((user: IAuthTypes) => (
					<UIUserCard {...user} key={user._id} handleSocketMessage={handleUpdateFriends} />
				))}
			</UIGrid>
			<UIPagination page={page + 1} totalPages={data?.totalPage} onChangedPage={changePage} />
		</>
	);
};

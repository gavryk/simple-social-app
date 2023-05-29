import React, { useState } from 'react';
import { UIGrid, UILoader, UIPagination, UIUserCard } from '@/components';
import { useGetAllUserQuery } from '@/store/api/users.api';
import { IAuthTypes } from '@/common';
import { useSocket } from '@/context';
import { SocketMsgType } from '@/common/interfaces/socketTypes';

export const Users: React.FC = () => {
	const [page, setPage] = useState(0);
	const { data, isLoading, isError } = useGetAllUserQuery(page);
	const { socket } = useSocket();

	const handleSocketMessage = ({ sender, receiver, type }: SocketMsgType) => {
		socket?.emit('sendNotification', {
			sender,
			receiver,
			type,
		});
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
					<UIUserCard {...user} key={user._id} handleSocketMessage={handleSocketMessage} />
				))}
			</UIGrid>
			<UIPagination page={page + 1} totalPages={data?.totalPage} onChangedPage={changePage} />
		</>
	);
};

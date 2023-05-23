import React from 'react';
import { UIGrid, UILoader, UIUserCard } from '@/components';
import { useGetAllUserQuery } from '@/store/api/users.api';
import { IAuthTypes } from '@/common';
import { useSocket } from '@/context';

export const Users: React.FC = () => {
	const { data, isLoading, isError } = useGetAllUserQuery();
	const { socket } = useSocket();

	const handleSocketMessage = ({
		senderName,
		receiverName,
		type,
	}: {
		senderName: string;
		receiverName: string;
		type: string;
	}) => {
		socket?.emit('sendNotification', {
			senderName,
			receiverName,
			type,
		});
	};

	if (isLoading) return <UILoader />;
	if (isError) return <h2>Something went wrong, please try again later</h2>;

	return (
		<UIGrid columns={4} gridGap={4}>
			{data?.map((user: IAuthTypes) => (
				<UIUserCard {...user} key={user._id} handleSocketMessage={handleSocketMessage} />
			))}
		</UIGrid>
	);
};

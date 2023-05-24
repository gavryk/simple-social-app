import React from 'react';
import { UIGrid, UILoader, UIUserCard } from '@/components';
import { useGetAllUserQuery } from '@/store/api/users.api';
import { IAuthTypes } from '@/common';
import { useSocket } from '@/context';

interface SocketMsgType {
	sender: any;
	receiver: any;
	type: string;
}

export const Users: React.FC = () => {
	const { data, isLoading, isError } = useGetAllUserQuery();
	const { socket } = useSocket();

	const handleSocketMessage = ({ sender, receiver, type }: SocketMsgType) => {
		socket?.emit('sendNotification', {
			sender,
			receiver,
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

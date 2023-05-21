import React, { useEffect } from 'react';
import { UIGrid, UILoader, UIUserCard } from '@/components';
import { useGetAllUserQuery } from '@/store/api/users.api';
import { IAuthTypes } from '@/common';
import { useAppDispatch } from '@/store/store';
import { setNotification } from '@/store/slices/settings/slice';

type UserPropsType = {
	webSocket: any;
};

export const Users: React.FC<UserPropsType> = ({ webSocket }) => {
	const dispatch = useAppDispatch();
	const { data, isLoading, isError } = useGetAllUserQuery();

	useEffect(() => {
		const handleGetNotification = (data: any) => {
			dispatch(setNotification(data));
		};

		webSocket?.on('getNotification', handleGetNotification);

		return () => {
			webSocket?.off('getNotification', handleGetNotification);
		};
	}, [webSocket, dispatch]);

	const handleSocketMessage = ({
		senderName,
		receiverName,
		type,
	}: {
		senderName: string;
		receiverName: string;
		type: string;
	}) => {
		webSocket?.emit('sendNotification', {
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

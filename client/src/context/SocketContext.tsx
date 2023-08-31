import { SocketContextType, SocketProviderProps, updateFriendsSocket } from '@/common';
import { useUpdateFriendsMutation } from '@/store/api/users.api';
import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext<SocketContextType>({
	socket: null,
	toggleUpdateFriends: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const socket = io(import.meta.env.VITE_SOCKET_URL);
	const [updateFriends] = useUpdateFriendsMutation();

	const toggleUpdateFriends = async ({ sender, receiver, isFollow }: updateFriendsSocket) => {
		await updateFriends({ id: sender._id, friendId: receiver._id }).then(() => {
			socket?.emit('sendNotification', {
				receiver: { id: receiver._id, name: `${receiver.firstName} ${receiver.lastName}` },
				sender: { id: sender?._id, name: `${sender?.firstName} ${sender?.lastName}` },
				type: !isFollow ? 'follow' : 'unfollow',
			});
		});
	};

	return (
		<SocketContext.Provider value={{ socket, toggleUpdateFriends }}>
			{children}
		</SocketContext.Provider>
	);
};

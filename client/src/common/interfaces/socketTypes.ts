import { Socket } from 'socket.io-client';
import { IAuthTypes } from './authTypes';
export interface SocketContextType {
	socket: Socket | null;
	toggleUpdateFriends: any;
}

export interface SocketProviderProps {
	children: React.ReactNode;
}

export interface updateFriendsSocket {
	sender: IAuthTypes;
	receiver: { _id: string; firstName: string; lastName: string };
	isFollow: string;
}

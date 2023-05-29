import { Socket } from 'socket.io-client';
export interface SocketContextType {
	socket: Socket | null;
}

export interface SocketProviderProps {
	children: React.ReactNode;
}
export interface SocketMsgType {
	sender: any;
	receiver: any;
	type: string;
}

import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
	socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
	children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const socket = io(import.meta.env.VITE_SOCKET_URL);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

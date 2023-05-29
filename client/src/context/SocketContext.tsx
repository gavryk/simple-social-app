import { SocketContextType, SocketProviderProps } from '@/common';
import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const socket = io(import.meta.env.VITE_SOCKET_URL);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

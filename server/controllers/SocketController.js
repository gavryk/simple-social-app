import { Server } from 'socket.io';

export const socketConnect = (server) => {
	const io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			methods: ['GET', 'POST'],
			credentials: true,
		},
	});
	let onlineUsers = [];

	const addNewUser = (username, socketId) => {
		!onlineUsers.some((user) => user.username === username) &&
			onlineUsers.push({ username, socketId });
	};
	const removeUser = (socketId) => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
	};
	const getUser = (username) => {
		return onlineUsers.find((user) => user.username === username);
	};

	//Handler of new connections to the WebSocket server
	io.on('connection', async (socket) => {
		socket.on('newUser', (username) => {
			addNewUser(username, socket.id);
		});

		socket.on('sendNotification', ({ senderName, receiverName, type }) => {
			const receiver = getUser(receiverName);
			io.to(receiver.socketId).emit('getNotification', {
				senderName,
				type,
			});
		});

		socket.on('disconnect', () => {
			removeUser(socket.id);
		});
	});
};

import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

let connections = new Set(); //variable for save active connections

//Function to send messages to all connected clients
const broadcastMessage = (message) => {
	connections.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

export const socketConnect = (server) => {
	//Connect Socket
	const wss = new WebSocketServer({ server });
	//Handler of new connections to the WebSocket server
	wss.on('connection', (ws) => {
		//Adding a new connection to save
		connections.add(ws);
		ws.on('message', (message) => {
			console.log('Received message: ', message);
		});

		ws.on('close', () => {
			connections.delete(ws);
		});
	});
};

export const notifyUpdate = (followerId, userId) => {
	const message = JSON.stringify({ followerId, userId, type: 'update' });
	broadcastMessage(message);
	console.log(message);
};

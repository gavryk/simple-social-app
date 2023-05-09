import express from 'express';
import {
	getUser,
	getUserFriends,
	updateFriends,
	getAllUsers,
	updateUser,
} from '../controllers/UserController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

//Read
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
router.get('/', verifyToken, getAllUsers);

//Update
router.patch('/:id/:friendId', verifyToken, updateFriends);
router.patch('/:id', verifyToken, updateUser);

export default router;

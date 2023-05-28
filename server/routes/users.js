import express from 'express';
import {
	getUser,
	getUserFollowers,
	getUserFollowing,
	updateFriends,
	getAllUsers,
	updateUser,
} from '../controllers/UserController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

//Read
router.get('/:id', verifyToken, getUser);
router.get('/:id/followers', verifyToken, getUserFollowers);
router.get('/:id/following', verifyToken, getUserFollowing);
router.get('/', verifyToken, getAllUsers);

//Update
router.patch('/:id/:friendId', verifyToken, updateFriends);
router.patch('/:id', verifyToken, updateUser);

export default router;

import express from 'express';
import { getUser, getUserFriends, updateFriends } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

//Read
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//Update
router.patch('/:id/:friendId', verifyToken, updateFriends);

export default router;

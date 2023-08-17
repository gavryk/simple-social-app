import express from 'express';
import {
	createPost,
	getAllPosts,
	getUserPosts,
	likePost,
	removePost,
} from '../controllers/PostsController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getAllPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

router.patch('/:id/like', verifyToken, likePost);

router.delete('/:id', verifyToken, removePost);

export default router;

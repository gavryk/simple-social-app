import express from 'express';
import {
	createPost,
	getFeedPosts,
	getUserPosts,
	likePost,
} from '../controllers/PostsController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

router.post('/posts', verifyToken, createPost);
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

router.patch('/:id/like', verifyToken, likePost);

export default router;

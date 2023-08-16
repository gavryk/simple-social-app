import express from 'express';
import { createPost, getAllPosts, getUserPosts, likePost } from '../controllers/PostsController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getAllPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

router.patch('/:id/like', verifyToken, likePost);

export default router;

import express from 'express';
import { getUser } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/index.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);

export default router;

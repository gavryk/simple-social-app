import express from 'express';
import { login, register, getProfile, logout } from '../controllers/AuthController.js';
import { handleValidationErrors, verifyToken } from '../middleware/index.js';
import { loginValidator, registerValidator } from '../validation.js';

const router = express.Router();

router.post('/login', loginValidator, handleValidationErrors, login);
router.post('/register', registerValidator, handleValidationErrors, register);
router.get('/profile', verifyToken, getProfile);
router.post('/logout', logout);

export default router;

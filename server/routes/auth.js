import express from 'express';
import { login } from '../controllers/AuthController.js';
import { handleValidationErrors } from '../middleware/index.js';

const router = express.Router();

router.post('/login', handleValidationErrors, login);

export default router;

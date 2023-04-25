import express from 'express';
import { login, register } from '../controllers/AuthController.js';
import { handleValidationErrors, validation } from '../middleware/index.js';

const router = express.Router();

router.post('/login', validation, handleValidationErrors, login);
router.post('/register', validation, handleValidationErrors, register);

export default router;

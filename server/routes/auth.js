import express from 'express';
import { login, register } from '../controllers/AuthController.js';
import { handleValidationErrors } from '../middleware/index.js';
import { loginValidator, registerValidator } from '../validation.js';

const router = express.Router();

router.post('/login', loginValidator, handleValidationErrors, login);
router.post('/register', registerValidator, handleValidationErrors, register);

export default router;

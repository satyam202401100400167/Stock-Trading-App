import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, admin, getAllUsers);

export default router;

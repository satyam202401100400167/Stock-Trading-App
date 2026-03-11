import express from 'express';
import { createTransaction, getUserTransactions, getAllTransactions } from '../controllers/transactionController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/mytransactions', protect, getUserTransactions);
router.get('/', protect, admin, getAllTransactions);

export default router;

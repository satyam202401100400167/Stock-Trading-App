import express from 'express';
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);

export default router;

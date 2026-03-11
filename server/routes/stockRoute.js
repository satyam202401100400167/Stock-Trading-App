import express from 'express';
import { getAllStocks, addStock, getStockById } from '../controllers/stockController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllStocks);
router.post('/', protect, admin, addStock);
router.get('/:id', getStockById);

export default router;

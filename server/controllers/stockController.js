import { Stock } from '../models/stockSchema.js';

// Get all stocks
export const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find({});
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new stock (Admin)
export const addStock = async (req, res) => {
    try {
        const { symbol, name, price, count, totalPrice, stockExchange } = req.body;
        
        const stock = new Stock({
            user: req.user.id,
            symbol, name, price, count, totalPrice, stockExchange
        });
        
        const createdStock = await stock.save();
        res.status(201).json(createdStock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single stock
export const getStockById = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (stock) {
            res.json(stock);
        } else {
            res.status(404).json({ message: 'Stock not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import { Order } from '../models/orderSchema.js';
import { User } from '../models/userModel.js';
import { Transaction } from '../models/transactionModel.js';

export const createOrder = async (req, res) => {
    try {
        const { symbol, name, price, count, stockType, orderType } = req.body;
        const totalPrice = price * count;
        
        const user = await User.findById(req.user.id);
        
        if (orderType === 'buy') {
            if (user.balance < totalPrice) return res.status(400).json({ message: 'Insufficient funds to buy' });
            user.balance -= totalPrice;
        } else if (orderType === 'sell') {
            const boughtOrders = await Order.find({ user: req.user.id, symbol, orderType: 'buy' });
            const soldOrders = await Order.find({ user: req.user.id, symbol, orderType: 'sell' });
            
            const totalBought = boughtOrders.reduce((acc, curr) => acc + curr.count, 0);
            const totalSold = soldOrders.reduce((acc, curr) => acc + curr.count, 0);
            
            if ((totalBought - totalSold) < count) {
                return res.status(400).json({ message: 'Not enough stocks to sell' });
            }
            
            user.balance += totalPrice;
        }
        
        await user.save();

        const order = new Order({
            user: req.user.id,
            symbol, name, price, count, totalPrice,
            stockType, orderType, orderStatus: 'completed'
        });
        const createdOrder = await order.save();
        
        const transaction = new Transaction({
            user: req.user.id,
            type: orderType === 'buy' ? 'withdraw' : 'deposit',
            paymentMode: 'auto-trading',
            amount: totalPrice,
            time: new Date().toISOString()
        });
        await transaction.save();

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ _id: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ _id: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

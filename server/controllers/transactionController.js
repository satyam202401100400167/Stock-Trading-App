import { Transaction } from '../models/transactionModel.js';
import { User } from '../models/userModel.js';

export const createTransaction = async (req, res) => {
    try {
        const { type, paymentMode, amount } = req.body;
        
        const transaction = new Transaction({
            user: req.user.id,
            type,
            paymentMode,
            amount,
            time: new Date().toISOString()
        });

        const user = await User.findById(req.user.id);
        if (type === 'deposit') {
            user.balance += Number(amount);
        } else if (type === 'withdraw') {
            if (user.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });
            user.balance -= Number(amount);
        }
        await user.save();

        const createdTransaction = await transaction.save();
        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ time: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ time: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

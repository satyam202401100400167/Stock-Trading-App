import mongoose from 'mongoose';

const stocksSchema = new mongoose.Schema({
    user: { type: String },
    symbol: { type: String },
    name: { type: String },
    price: { type: Number },
    count: { type: Number },
    totalPrice: { type: Number },
    stockExchange: { type: String }
});

export const Stock = mongoose.model('stocks', stocksSchema);

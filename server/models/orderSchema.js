import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    user: { type: String },
    symbol: { type: String },
    name: { type: String },
    price: { type: Number },
    count: { type: Number },
    totalPrice: { type: Number },
    stockType: { type: String }, // intraday / delivery
    orderType: { type: String }, // buy / sell
    orderStatus: { type: String }
});

export const Order = mongoose.model('orders', ordersSchema);

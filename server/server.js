import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// We will create these routes in the next step
import userRoute from './routes/userRoute.js';
import stockRoute from './routes/stockRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import orderRoute from './routes/orderRoute.js';


dotenv.config();

connectDB();

const app = express();
const cors = require("cors");

app.use(cors({
    origin: "https://stock-trading-app-nine.vercel.app/"
}));

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/stocks', stockRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/orders', orderRoute);

app.get('/', (req, res) => {
    res.send('SB Stocks API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

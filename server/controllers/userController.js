import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id, usertype) => {
    return jwt.sign({ id, usertype }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, usertype } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const type = usertype || 'user';
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            usertype: type,
            balance: 100000 // Starting balance for paper trading
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                usertype: user.usertype,
                balance: user.balance,
                token: generateToken(user._id, user.usertype)
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                usertype: user.usertype,
                balance: user.balance,
                token: generateToken(user._id, user.usertype)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users (Admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Campus FixIt API is running 🚀',
  });
});

const HOST = '0.0.0.0'; // Listen on all network interfaces
const PORT = process.env.PORT || 7224; // Match this with your frontend's expected port

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Access from other devices on the same network:`);
  console.log(`- http://192.168.29.3:${PORT} (your local IP)`);
  console.log('\nMake sure your mobile device is on the same WiFi network as this computer.');
});

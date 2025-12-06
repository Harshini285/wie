import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

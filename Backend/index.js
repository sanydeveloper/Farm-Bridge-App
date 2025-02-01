import express from 'express';
import pool from './db/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());  // Parse JSON bodies
app.use(
    cors({
      origin: 'http://192.168.29.189:8081', // Replace with your frontend URL
      credentials: true, // Allow credentials (cookies)
    })
  );
  

// Testing DB Conncection;

app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database connected!", time: result.rows[0].now });
    } catch (error) {
        console.error('Error connecting to the database:', error.stack);
        res.status(500).json({ message: "Database connection error!" });
        
    }
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter)
app.use('/produce', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors({origin: ["http://localhost:5173","https://ecommerce-backend-phi-green.vercel.app","https://agumentik-ecom.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(5000, () => console.log('Server running on port 5000'));

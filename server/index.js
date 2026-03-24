const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const seedRoutes = require('./routes/seeds');
const fertilizerRoutes = require('./routes/fertilizers');
const implementRoutes = require('./routes/implements');
const cropcareRoutes = require('./routes/cropcare');
const productRoutes = require('./routes/products');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/sandeepam')
  .then(() => console.log('MongoDB connected - sandeepam DB'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/seeds', seedRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/implements', implementRoutes);
app.use('/api/cropcare', cropcareRoutes);
app.use('/api/products', productRoutes);   

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

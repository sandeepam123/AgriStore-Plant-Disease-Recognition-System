const mongoose = require('mongoose');

const seedSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: String,
  stock: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model('Seed', seedSchema, 'seeds');

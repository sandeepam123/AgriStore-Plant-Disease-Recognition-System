const express = require('express');
const router = express.Router();

const adminAuth = require('../middleware/adminAuth');

const Seed = require('../models/Seed');
const Fertilizer = require('../models/Fertilizer');
const Implement = require('../models/Implement');
const CropCare = require('../models/CropCare');

// ✅ Only admin can add product
router.post('/', adminAuth, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      stock,
      category,
      image,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    let Model;

    switch (category) {
      case 'seeds':
        Model = Seed;
        break;
      case 'fertilizers':
        Model = Fertilizer;
        break;
      case 'implements':
        Model = Implement;
        break;
      case 'cropcare':
        Model = CropCare;
        break;
      default:
        return res.status(400).json({ msg: 'Invalid category' });
    }

    const product = new Model({
      name,
      description,
      price,
      quantity,
      stock,
      category,
      image,
    });

    await product.save();

    res.status(201).json({
      msg: 'Product added successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error while adding product' });
  }
});

module.exports = router;
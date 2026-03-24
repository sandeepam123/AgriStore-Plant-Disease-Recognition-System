const express = require('express');
const router = express.Router();
const Fertilizer = require('../models/Fertilizer');

router.get('/', async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find({});
    res.json(fertilizers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching fertilizers' });
  }
});

module.exports = router;

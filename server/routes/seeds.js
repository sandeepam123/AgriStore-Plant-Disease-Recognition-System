const express = require('express');
const router = express.Router();
const Seed = require('../models/Seed');

router.get('/', async (req, res) => {
  try {
    const seeds = await Seed.find({});
    res.json(seeds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching seeds' });
  }
});

module.exports = router;

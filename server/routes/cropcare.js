const express = require('express');
const router = express.Router();
const CropCare = require('../models/CropCare');

router.get('/', async (req, res) => {
  try {
    const cropcare = await CropCare.find({});
    res.json(cropcare);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching cropcare' });
  }
});

module.exports = router;

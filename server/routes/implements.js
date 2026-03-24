const express = require('express');
const router = express.Router();
const Implement = require('../models/Implement');

router.get('/', async (req, res) => {
  try {
    const implements = await Implement.find({});
    res.json(implements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching implements' });
  }
});

module.exports = router;

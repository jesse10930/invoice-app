const express = require('express');
const router = express.Router();

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  res.send('Get all items');
});

// @route   POST api/items
// @desc    Add an item
// @access  Public
router.post('/', (req, res) => {
  res.send('Add an item');
});

// @route   PUT api/items/:id
// @desc    Edit an item
// @access  Public
router.put('/:id', (req, res) => {
  res.send('Edit an item');
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
  res.send('Delete an item');
});

module.exports = router;

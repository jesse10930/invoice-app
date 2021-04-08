const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ price: -1 });
    res.send(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/items
// @desc    Add an item
// @access  Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('quantity', 'quantity is required').not().isEmpty(),
    check('price', 'price is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, quantity, price, total } = req.body;

    try {
      let newItem = new Item({
        name,
        quantity,
        price,
        total,
      });
      let item = await newItem.save();
      res.send(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/items/:id
// @desc    Edit an item
// @access  Public
router.put('/:id', async (req, res) => {
  const { name, quantity, price, total } = req.body;
  const itemFields = {};
  if (name) itemFields.name = name;
  if (quantity) itemFields.quantity = quantity;
  if (price) itemFields.price = price;
  if (total) itemFields.total = total;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    item = await Item.findByIdAndUpdate(req.params.id, {
      $set: itemFields,
    });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    await Item.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

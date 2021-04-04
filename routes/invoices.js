const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Invoice = require('../models/Invoice');

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Public
router.get('/', (req, res) => {
  res.send('Get all invoices');
});

// @route   POST api/invoices
// @desc    Add an invoice
// @access  Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('amount', 'amount is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed');
  }
);

// @route   PUT api/invoices/:id
// @desc    Edit an invoice
// @access  Public
router.put('/:id', (req, res) => {
  res.send('Edit an invoice');
});

// @route   DELETE api/invoices/:id
// @desc    Delete an invoice
// @access  Public
router.delete('/:id', (req, res) => {
  res.send('Delete an invoice');
});

module.exports = router;

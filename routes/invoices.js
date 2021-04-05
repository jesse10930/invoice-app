const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Invoice = require('../models/Invoice');

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.send(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      id,
      date,
      name,
      amount,
      status,
      street,
      city,
      zip,
      country,
      email,
      billToStreet,
      billToCity,
      billToZip,
      billToCountry,
      paymentTerms,
      description,
    } = req.body;

    try {
      let newInvoice = new Invoice({
        id,
        date,
        name,
        amount,
        status,
        street,
        city,
        zip,
        country,
        email,
        billToStreet,
        billToCity,
        billToZip,
        billToCountry,
        paymentTerms,
        description,
      });

      const invoice = await newInvoice.save();

      res.send(invoice);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/invoices/:id
// @desc    Edit an invoice
// @access  Public
router.put('/:id', async (req, res) => {
  const {
    id,
    name,
    amount,
    status,
    street,
    city,
    zip,
    country,
    email,
    billToStreet,
    billToCity,
    billToZip,
    billToCountry,
    paymentTerms,
    description,
  } = req.body;

  const invoiceFields = {};
  if (id) invoiceFields.id = id;
  if (name) invoiceFields.name = name;
  if (amount) invoiceFields.amount = amount;
  if (status) invoiceFields.status = status;
  if (street) invoiceFields.street = street;
  if (city) invoiceFields.city = city;
  if (zip) invoiceFields.zip = zip;
  if (country) invoiceFields.country = country;
  if (email) invoiceFields.email = email;
  if (billToStreet) invoiceFields.billToStreet = billToStreet;
  if (billToCity) invoiceFields.billToCity = billToCity;
  if (billToZip) invoiceFields.billToZip = billToZip;
  if (billToCountry) invoiceFields.billToCountry = billToCountry;
  if (paymentTerms) invoiceFields.paymentTerms = paymentTerms;
  if (description) invoiceFields.description = description;

  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    invoice = await Invoice.findByIdAndUpdate(req.params.id, {
      $set: invoiceFields,
    });

    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/invoices/:id
// @desc    Delete an invoice
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    await Invoice.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Invoice removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

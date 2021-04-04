const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
  id: {
    type: String,
    default: 'AB1234',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  billToStreet: {
    type: String,
    required: true,
  },
  billToCity: {
    type: String,
    required: true,
  },
  billToZip: {
    type: String,
    required: true,
  },
  billToCountry: {
    type: String,
    required: true,
  },
  paymentTerms: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('invoice', InvoiceSchema);

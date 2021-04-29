const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Test for DB
app.get('/', (req, res) => res.json({ msg: 'welcome to the invoice app' }));

// Define routes
app.use('/api/invoices', require('./routes/invoices'));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

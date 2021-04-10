import React from 'react';
import Navbar from './components/layouts/Navbar';
import Header from './components/layouts/Header';
import Invoices from './components/invoices/Invoices';
import InvoiceState from './context/invoice/InvoiceState';
import './App.scss';

const App = () => {
  return (
    <div id='main-app'>
      <InvoiceState>
        <Navbar />
        <Header />
        <Invoices />
      </InvoiceState>
    </div>
  );
};

export default App;

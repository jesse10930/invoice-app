import React, { useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';

const Header = () => {
  const invoiceContext = useContext(InvoiceContext);

  const { invoices, clicked } = invoiceContext;

  return (
    !clicked && (
      <div id='header'>
        <div id='header-left'>
          <h1>Invoices</h1>
          {invoices ? (
            <p>There are {invoices.length} total invoices</p>
          ) : (
            <p>There are 0 total invoices</p>
          )}
        </div>
        <div id='header-right'>
          <div id='filter-dropdown'>
            <p id='filter-title'>Filter by Status</p>
            <img
              src={require('../../images/icon-arrow-down.svg').default}
              alt='icon-arrow-down'
            />
          </div>
          <div id='new-invoice-container'>
            <div id='new-invoice-icon'>
              <img
                src={require('../../images/icon-plus.svg').default}
                alt='icon-plus'
              />
            </div>
            <p>New Invoice</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;

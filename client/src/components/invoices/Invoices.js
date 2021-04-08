import React, { useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';

const Invoices = () => {
  const invoiceContext = useContext(InvoiceContext);

  const { invoices } = invoiceContext;

  return (
    <div id='invoices'>
      {invoices ? (
        <div id='invoice-list'>
          {invoices.map((invoice) => (
            <h3>{invoice.id}</h3>
          ))}
        </div>
      ) : (
        <div id='empty-container'>
          <img
            src={require('../../images/illustration-empty.svg').default}
            alt='icon-moon'
          />
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the{' '}
            <span style={{ fontWeight: '700' }}>New Invoice</span> button and
            get started
          </p>
        </div>
      )}
    </div>
  );
};

export default Invoices;

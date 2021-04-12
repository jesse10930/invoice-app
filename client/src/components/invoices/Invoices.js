import React, { useContext } from 'react';
import InvoiceItem from './InvoiceItem';
import Details from './Details';
import InvoiceContext from '../../context/invoice/invoiceContext';

const Invoices = () => {
  const invoiceContext = useContext(InvoiceContext);

  const {
    invoices,
    currentUser,
    invoiceDetails,
    invoiceDetailsClick,
  } = invoiceContext;

  return !invoiceDetails ? (
    <div id='invoices'>
      {invoices ? (
        <div id='invoice-list'>
          {invoices.map((invoice, i) => (
            <InvoiceItem
              key={i}
              invoice={invoice}
              onClick={invoiceDetailsClick}
            />
          ))}
        </div>
      ) : (
        <div id='empty-container'>
          <img
            src={require('../../images/illustration-empty.svg').default}
            alt='emtpy-illustration'
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
  ) : (
    <Details currentUser={currentUser} />
  );
};

export default Invoices;

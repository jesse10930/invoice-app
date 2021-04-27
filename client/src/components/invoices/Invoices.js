import React, { useContext, useEffect } from 'react';
import InvoiceItem from './InvoiceItem';
import Details from './Details';
import InvoiceContext from '../../context/invoice/invoiceContext';
import DarkContext from '../../context/dark/darkContext';

const Invoices = () => {
  const invoiceContext = useContext(InvoiceContext);
  const darkContext = useContext(DarkContext);

  const { dark } = darkContext;

  const {
    invoices,
    currentUser,
    invoiceDetails,
    filters,
    newInvoiceForm,
    getInvoices,
  } = invoiceContext;

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line
  }, []);

  let filtered = invoices.filter((invoice) => filters.includes(invoice.status));

  return !invoiceDetails ? (
    <div
      id='invoices'
      className={newInvoiceForm ? 'modal-container' : null}
      style={newInvoiceForm ? { marginTop: '120px' } : null}
    >
      {filtered.length > 0 ? (
        <div id='invoice-list'>
          {filtered.map((invoice, i) => (
            <InvoiceItem key={i} invoice={invoice} />
          ))}
        </div>
      ) : (
        <div id='empty-container'>
          <img
            src={require('../../images/illustration-empty.svg').default}
            alt='emtpy-illustration'
          />
          <h2 className={dark ? 'dark' : undefined}>There is nothing here</h2>
          <p className={dark ? 'dark' : undefined}>
            Create an invoice by clicking the{' '}
            <span style={{ fontWeight: '700' }}>New Invoice</span> button and
            get started, or change the{' '}
            <span style={{ fontWeight: '700' }}>Filter by Status</span>
          </p>
        </div>
      )}
    </div>
  ) : (
    <Details currentUser={currentUser} />
  );
};

export default Invoices;

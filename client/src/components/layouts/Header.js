import React, { useContext } from 'react';
import NewInvoice from '../modals/NewInvoice';
import InvoiceContext from '../../context/invoice/invoiceContext';

const Header = () => {
  const invoiceContext = useContext(InvoiceContext);

  const {
    invoices,
    newInvoiceForm,
    newInvoiceClick,
    invoiceDetails,
    filterCheck,
    filters,
  } = invoiceContext;

  const onCheck = (e) => {
    filterCheck(e.target.value);
  };

  const filtered = invoices.filter((invoice) =>
    filters.includes(invoice.status)
  );

  return (
    !invoiceDetails && (
      <div id='header' className='modal-container'>
        {newInvoiceForm ? (
          <div className='back-drop' style={{ position: 'fixed' }}></div>
        ) : null}
        <div id='header-left'>
          <h1>Invoices</h1>
          {invoices ? (
            <p>There are {filtered.length} total invoices</p>
          ) : (
            <p>There are 0 total invoices</p>
          )}
        </div>
        <div id='header-right'>
          <div id='filter-dropdown'>
            <div id='heading-arrow'>
              <p id='filter-title'>Filter by Status</p>
              <img
                src={require('../../images/icon-arrow-down.svg').default}
                alt='icon-arrow-down'
              />
            </div>
            <div id='filter-choices'>
              <label className='container'>
                Draft
                <input
                  onClick={onCheck}
                  type='checkbox'
                  defaultChecked='false'
                  value='draft'
                />
                <span className='checkmark'></span>
              </label>
              <label className='container'>
                Pending
                <input
                  type='checkbox'
                  defaultChecked='false'
                  onClick={onCheck}
                  value='pending'
                />
                <span className='checkmark'></span>
              </label>
              <label className='container'>
                Paid
                <input
                  type='checkbox'
                  defaultChecked='false'
                  onClick={onCheck}
                  value='paid'
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
          <div id='new-invoice-container' onClick={newInvoiceClick}>
            <div id='new-invoice-icon'>
              <img
                src={require('../../images/icon-plus.svg').default}
                alt='icon-plus'
              />
            </div>
            <p>New Invoice</p>
          </div>
        </div>
        {newInvoiceForm && <NewInvoice />}
      </div>
    )
  );
};

export default Header;

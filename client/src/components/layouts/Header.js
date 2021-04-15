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
  } = invoiceContext;

  return (
    !invoiceDetails && (
      <div id='header' className='modal-container'>
        {newInvoiceForm ? (
          <div className='back-drop' style={{ position: 'fixed' }}></div>
        ) : null}
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
            <div id='heading-arrow'>
              <p id='filter-title'>Filter by Status</p>
              <img
                src={require('../../images/icon-arrow-down.svg').default}
                alt='icon-arrow-down'
              />
            </div>
            <div id='filter-choices'>
              <label class='container'>
                Draft
                <input type='checkbox' checked='false' />
                <span class='checkmark'></span>
              </label>
              <label class='container'>
                Pending
                <input type='checkbox' checked='false' />
                <span class='checkmark'></span>
              </label>
              <label class='container'>
                Paid
                <input type='checkbox' checked='false' />
                <span class='checkmark'></span>
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

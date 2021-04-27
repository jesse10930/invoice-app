import React, { Fragment, useContext } from 'react';
import NewInvoice from '../modals/NewInvoice';
import InvoiceContext from '../../context/invoice/invoiceContext';
import DarkContext from '../../context/dark/darkContext';

const Header = () => {
  const invoiceContext = useContext(InvoiceContext);
  const darkContext = useContext(DarkContext);
  const { dark } = darkContext;
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

  let numOfInvoices = filtered.length;
  let filterTypes;
  let numOfFilters = filters.length;
  switch (numOfFilters) {
    case 1:
      filterTypes = filters[0] + ' invoices';
      break;
    case 2:
      filterTypes = filters[0] + ' & ' + filters[1] + ' invoices';
      break;
    case 3:
      filterTypes = 'total invoices';
      break;
    default:
      filterTypes = 'filters selected';
      numOfInvoices = 'no';
  }

  return (
    !invoiceDetails && (
      <Fragment>
        <div id='header' className={newInvoiceForm ? 'modal-container' : null}>
          <div id='header-left'>
            <h1 className={dark ? 'dark' : undefined}>Invoices</h1>
            {invoices ? (
              <p className={dark ? 'dark' : undefined}>
                There are {numOfInvoices} {filterTypes}
              </p>
            ) : (
              <p>There are 0 total invoices</p>
            )}
          </div>
          <div id='header-right'>
            <div id='filter-dropdown'>
              <div id='heading-arrow'>
                <p id='filter-title' className={dark ? 'dark' : undefined}>
                  Filter by Status
                </p>
                <img
                  src={require('../../images/icon-arrow-down.svg').default}
                  alt='icon-arrow-down'
                />
              </div>
              <div id='filter-choices' className={dark ? 'dark' : undefined}>
                <label className={dark ? 'dark container' : 'container'}>
                  Draft
                  <input
                    onClick={onCheck}
                    type='checkbox'
                    defaultChecked='false'
                    value='draft'
                  />
                  <span
                    className={dark ? 'checkmark dark' : 'checkmark'}
                  ></span>
                </label>
                <label className={dark ? 'dark container' : 'container'}>
                  Pending
                  <input
                    type='checkbox'
                    defaultChecked='false'
                    onClick={onCheck}
                    value='pending'
                  />
                  <span
                    className={dark ? 'checkmark dark' : 'checkmark'}
                  ></span>
                </label>
                <label className={dark ? 'dark container' : 'container'}>
                  Paid
                  <input
                    type='checkbox'
                    defaultChecked='false'
                    onClick={onCheck}
                    value='paid'
                  />
                  <span
                    className={dark ? 'checkmark dark' : 'checkmark'}
                  ></span>
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
        </div>
        {newInvoiceForm && <NewInvoice />}
      </Fragment>
    )
  );
};

export default Header;

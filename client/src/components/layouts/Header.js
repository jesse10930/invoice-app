import React, { useContext, useState } from 'react';
import NewInvoice from '../modals/NewInvoice';
import FilterModal from '../modals/FilterModal';
import InvoiceContext from '../../context/invoice/invoiceContext';

const Header = () => {
  const invoiceContext = useContext(InvoiceContext);

  const { invoices, clicked } = invoiceContext;

  const [newInvoiceClicked, setNewInvoiceClicked] = useState(true);

  return (
    !clicked && (
      <div id='header'>
        {newInvoiceClicked ? <div className='back-drop'></div> : null}
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
            <FilterModal />
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
        {newInvoiceClicked && <NewInvoice />}
      </div>
    )
  );
};

export default Header;

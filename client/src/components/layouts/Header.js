import React from 'react';

const Header = () => {
  return (
    <div id='header'>
      <div id='header-left'>
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>
      <div id='header-right'>
        <div id='filter-dropdown'>
          <p id='filter-title'>Filter by Status</p>
          <img
            src={require('../../images/icon-arrow-down.svg').default}
            alt='icon-moon'
          />
        </div>
        <div id='new-invoice-container'>
          <div id='new-invoice-icon'>
            <img
              src={require('../../images/icon-plus.svg').default}
              alt='icon-moon'
            />
          </div>
          <p>New Invoice</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

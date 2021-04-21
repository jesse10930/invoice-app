import React, { useState, useEffect, useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';

const InvoiceItem = ({ invoice }) => {
  const invoiceContext = useContext(InvoiceContext);

  const { invoiceDetailsClick } = invoiceContext;

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const { id, paymentDue, total, clientName, status } = invoice;

  useEffect(() => {
    const year = paymentDue.substring(0, 4);
    const month = parseInt(paymentDue.substring(5, 7)) - 1;
    const day = paymentDue.substring(8);
    const d = new Date(year, month, day).toString();
    setYear(d.substring(11, 15));
    setMonth(d.substring(4, 7));
    setDay(d.substring(8, 10));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='invoice-item' onClick={() => invoiceDetailsClick(invoice)}>
      <h3 className='item-id'>
        <span style={{ color: '#7e88c3' }}>#</span>
        {id}
      </h3>
      <p className='item-created-at'>
        Due {day} {month} {year}
      </p>
      <p className='item-client-name'>{clientName}</p>
      <h3 className='item-payment-due'>
        $
        {total
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </h3>
      <div className='colored-part-and-arrow'>
        <div id={status} className='item-status-container'>
          <div className='dot'></div>
          <p className='item-status'>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
        <img
          src={require('../../images/icon-arrow-right.svg').default}
          alt='icon-arrow-right'
        />
      </div>
    </div>
  );
};

export default InvoiceItem;

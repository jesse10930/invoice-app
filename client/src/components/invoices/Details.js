import React, { useState, useEffect } from 'react';
import EditInvoice from '../modals/EditInvoice';
import DeleteModal from '../modals/DeleteModal';

const Details = ({ currentUser }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [dueYear, setDueYear] = useState('');
  const [dueMonth, setDueMonth] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [editInvoiceClicked, setEditInvoiceClicked] = useState(true);
  const [deleteInvoiceClicked, setDeleteInvoiceClicked] = useState(false);

  useEffect(() => {
    const year = createdAt.substring(0, 4);
    const month = parseInt(createdAt.substring(5, 7)) - 1;
    const day = createdAt.substring(8);
    const d = new Date(year, month, day).toString();
    setYear(d.substring(11, 15));
    setMonth(d.substring(4, 7));
    setDay(d.substring(8, 10));

    const dueYear = paymentDue.substring(0, 4);
    const dueMonth = parseInt(paymentDue.substring(5, 7)) - 1;
    const dueDay = paymentDue.substring(8);
    const dD = new Date(dueYear, dueMonth, dueDay).toString();
    setDueYear(dD.substring(11, 15));
    setDueMonth(dD.substring(4, 7));
    setDueDay(dD.substring(8, 10));
  });

  const {
    status,
    total,
    items,
    id,
    description,
    createdAt,
    paymentDue,
    clientName,
    clientEmail,
    clientAddress,
    senderAddress,
  } = currentUser;

  return (
    <div id='details-container'>
      {editInvoiceClicked || deleteInvoiceClicked ? (
        <div className='back-drop'></div>
      ) : null}
      <div id='back-button'>
        <img
          src={require('../../images/icon-arrow-left.svg').default}
          alt='icon-arrow-left'
        />
        <p>Go Back</p>
      </div>
      <div id='details-header'>
        <div id='dh-status'>
          <p id='status-word'>Status</p>
          <div id={status} className='item-status-container'>
            <div className='dot'></div>
            <p className='item-status'>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </div>
        </div>
        <div id='dh-options'>
          <div id='edit'>
            <p>Edit</p>
          </div>
          <div id='delete'>
            <p>Delete</p>
          </div>
          <div id='mark-as-paid'>
            <p>Mark as Paid</p>
          </div>
        </div>
      </div>
      <div id='details-card'>
        <div id='top-details'>
          <div id='td-group1'>
            <p id='td-id' className='td-bold'>
              <span style={{ color: '#7E88C3' }}>#</span>
              {id}
            </p>
            <p id='td-desription' className='td-beautiful'>
              {description}
            </p>
          </div>
          <div id='td-group2'>
            <p id='td-inv-date-header' className='td-beautiful'>
              Invoice Date
            </p>
            <p id='td-inv-date' className='td-bold'>
              {day} {month} {year}
            </p>
          </div>
          <div id='td-group3'>
            <p id='td-due-date-header' className='td-beautiful'>
              Payment Due
            </p>
            <p id='td-due-date' className='td-bold'>
              {dueDay} {dueMonth} {dueYear}
            </p>
          </div>
          <div id='td-group4'>
            <p id='td-bill-to-header' className='td-beautiful'>
              Bill To
            </p>
            <p id='td-bill-to-name' className='td-bold'>
              {clientName}
            </p>
            <div id='td-bill-to-address' className='td-beautiful'>
              <p id='client-street'>{clientAddress.street}</p>
              <p id='client-city'>{clientAddress.city}</p>
              <p id='client-zip'>{clientAddress.postCode}</p>
              <p id='client-country'>{clientAddress.country}</p>
            </div>
          </div>
          <div id='td-group5'>
            <p id='td-sent-to-header' className='td-beautiful'>
              Sent To
            </p>
            <p id='td-sent-to-email' className='td-bold'>
              {clientEmail}
            </p>
          </div>
          <div id='td-group6'>
            <div id='td-sender-address' className='td-beautiful'>
              <p id='client-street' style={{ float: 'right' }}>
                {senderAddress.street}
              </p>
              <br></br>
              <p id='client-city' style={{ float: 'right' }}>
                {senderAddress.city}
              </p>
              <br></br>
              <p id='client-zip' style={{ float: 'right' }}>
                {senderAddress.postCode}
              </p>
              <br></br>
              <p id='client-country' style={{ float: 'right' }}>
                {senderAddress.country}
              </p>
            </div>
          </div>
        </div>
        <div id='details-card-items'>
          <div id='dc-items-header'>
            <p id='item-name'>Item Name</p>
            <p id='qty'>QTY.</p>
            <p id='price'>Price</p>
            <p id='total'>Total</p>
          </div>
          {items.map((item, i) => {
            return (
              <div key={i} className='item-info'>
                <p className='item-info-name'>{item.name}</p>
                <p className='item-info-quantity'>{item.quantity}</p>
                <p className='item-info-price'>${item.price.toFixed(2)}</p>
                <p className='item-info-total'>
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
        <div id='details-card-total'>
          <p id='amount-due'>Amount Due</p>
          <div id='dc-total'>
            $
            {total
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>
      </div>
      {editInvoiceClicked && <EditInvoice />}
      {deleteInvoiceClicked && <DeleteModal />}
    </div>
  );
};

export default Details;

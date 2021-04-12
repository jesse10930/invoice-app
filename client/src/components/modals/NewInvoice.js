import React, { useState, useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';

const NewInvoice = () => {
  const invoiceContext = useContext(InvoiceContext);

  const [invoice, setInvoice] = useState({
    id: '',
    createdAt: '',
    paymentDue: '',
    description: '',
    paymentTerms: '',
    clientName: '',
    clientEmail: '',
    status: '',
    total: '',
  });
  const [senderAddress, setSenderAddress] = useState({
    senderStreet: '',
    senderCity: '',
    senderPostCode: '',
    senderCountry: '',
  });
  const [clientAddress, setClientAddress] = useState({
    clientStreet: '',
    clientCity: '',
    clientPostCode: '',
    clientCountry: '',
  });
  const [items, setItems] = useState({
    itemName: '',
    itemQty: '',
    itemPrice: '',
  });

  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    total,
  } = invoice;

  const {
    senderStreet,
    senderCity,
    senderPostCode,
    senderCountry,
  } = senderAddress;

  const {
    clientStreet,
    clientCity,
    clientPostCode,
    clientCountry,
  } = clientAddress;

  const { itemName, itemQty, itemPrice } = items;

  const onInvoiceChange = (e) =>
    setInvoice({ ...invoice, [e.target.name]: e.target.value });

  const onSenderAddressChange = (e) =>
    setSenderAddress({ ...senderAddress, [e.target.name]: e.target.value });

  const onClientAddressChange = (e) =>
    setClientAddress({ ...clientAddress, [e.target.name]: e.target.value });

  const onItemsChange = (e) =>
    setItems({ ...items, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    invoiceContext.addInvoice(invoice);
  };

  return (
    <div id='new-invoice-modal'>
      <p id='new-invoice-title'>New Invoice</p>
      <form onSubmit={onSubmit}>
        <div id='ni-bill-from'>
          <p className='modal-sec-title'>Bill From</p>
          <div id='street-address'>
            <p className='td-beautiful'>Street Address</p>
            <input
              type='text'
              id='ni-sa-input'
              name='senderStreet'
              value={senderStreet}
              onChange={onSenderAddressChange}
            />
          </div>
          <div id='ni-city-zip-country'>
            <div id='city'>
              <p className='td-beautiful'>City</p>
              <input
                type='text'
                id='ni-from-city'
                name='senderCity'
                value={senderCity}
                onChange={onSenderAddressChange}
              />
            </div>
            <div id='zip'>
              <p className='td-beautiful'>Post Code</p>
              <input
                type='text'
                id='ni-from-zip'
                name='senderPostCode'
                value={senderPostCode}
                onChange={onSenderAddressChange}
              />
            </div>
            <div id='country'>
              <p className='td-beautiful'>Country</p>
              <input
                type='text'
                id='ni-from-country'
                name='senderCountry'
                value={senderCountry}
                onChange={onSenderAddressChange}
              />
            </div>
          </div>
        </div>
        <div id='ni-bill-to'>
          <p className='modal-sec-title'>Bill To</p>
          <p className='td-beautiful'>Client's Name</p>
          <input
            type='text'
            name='clientName'
            value={clientName}
            onChange={onInvoiceChange}
          />
          <p className='td-beautiful'>Client's Email</p>
          <input
            type='email'
            name='clientEmail'
            value={clientEmail}
            onChange={onInvoiceChange}
          />
          <p className='td-beautiful'>Street Address</p>
          <input
            type='text'
            name='clientStreet'
            value={clientStreet}
            onChange={onClientAddressChange}
          />
          <div id='bt-cityzipcountry'>
            <div>
              <p className='td-beautiful'>City</p>
              <input
                type='text'
                name='clientCity'
                value={clientCity}
                onChange={onClientAddressChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Post Code</p>
              <input
                type='text'
                name='clientPostCode'
                value={clientPostCode}
                onChange={onClientAddressChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Country</p>
              <input
                type='text'
                name='clientCountry'
                value={clientCountry}
                onChange={onClientAddressChange}
              />
            </div>
          </div>
          <div id='td-date-terms'>
            <div>
              <p className='td-beautiful'>Invoice Date</p>
              <input
                type='date'
                name='createdAt'
                value={createdAt}
                onChange={onInvoiceChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Payment Terms</p>
              <input
                type='number'
                name='paymentTerms'
                value={paymentTerms}
                onChange={onInvoiceChange}
              />
            </div>
          </div>
          <p className='td-beautiful'>Project Description</p>
          <input
            type='text'
            name='description'
            value={description}
            onChange={onInvoiceChange}
          />
        </div>
        <div id='ni-item-list'>
          <p className='modal-big-title'>Item List</p>
          <div id='modal-item-list-header'>
            <p className='td-beautiful'>Item Name</p>
            <p className='td-beautiful'>Qty.</p>
            <p className='td-beautiful'>Price</p>
            <p className='td-beautiful'>Total</p>
          </div>
          <div id='modal-item-list-inputs'>
            <input
              type='text'
              id='item-name-input'
              name='itemName'
              value={itemName}
              onChange={onItemsChange}
            />
            <input
              type='text'
              id='qty-input'
              name='itemQty'
              value={itemQty}
              onChange={onItemsChange}
            />
            <input
              type='text'
              id='price-input'
              name='itemPrice'
              value={itemPrice}
              onChange={onItemsChange}
            />
            <p className='td-beautiful'>4550.00</p>
            <img
              src={require('../../images/icon-delete.svg').default}
              alt='icon-delete'
            />
          </div>
          <div id='modal-add-new-item'>
            <img
              src={require('../../images/icon-plus.svg').default}
              alt='icon-plus'
            />
            <p style={{ marginLeft: '5px' }}>Add New Item</p>
          </div>
        </div>
        <div id='ni-bot-btns'>
          <input
            type='submit'
            name='discard'
            value='Discard'
            className='form-btn discard'
          />
          <div id='save-btns'>
            <input
              type='submit'
              name='draft'
              value='Save as Draft'
              className='form-btn draft'
            />
            <input
              type='submit'
              name='pending'
              value='Save & Send'
              className='form-btn send'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;

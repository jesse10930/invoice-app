import React, { useState, useEffect, useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';

const NewInvoice = () => {
  const invoiceContext = useContext(InvoiceContext);

  const { addInvoice, discardClick } = invoiceContext;

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

  useEffect(() => {
    let d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    setInvoice({
      ...invoice,
      createdAt: [year, month, day].join('-'),
    });
  }, []);

  const {
    createdAt,
    description,
    paymentTerms,
    clientName,
    clientEmail,
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

  const incrementDate = (date, amount) => {
    let months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + amount);
    let stringDate = tempDate.toString();
    let dueString =
      stringDate.substring(11, 15) +
      '-' +
      months[stringDate.substring(4, 7)] +
      '-' +
      stringDate.substring(8, 10);
    return dueString;
  };

  const onInvoiceChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const onSenderAddressChange = (e) =>
    setSenderAddress({ ...senderAddress, [e.target.name]: e.target.value });

  const onClientAddressChange = (e) =>
    setClientAddress({ ...clientAddress, [e.target.name]: e.target.value });

  const onItemsChange = (e) =>
    setItems({ ...items, [e.target.name]: e.target.value });

  const onMouseOver = (e) => {
    setInvoice({ ...invoice, status: e.target.name });
  };

  const onTermsClick = (e) => {
    const tempPaymentTerms =
      e.target.id === 'day' ? 1 : e.target.id === 'week' ? 7 : 30;

    const tempPaymentDue = incrementDate(createdAt, tempPaymentTerms + 1);

    setInvoice({
      ...invoice,
      paymentTerms: tempPaymentTerms,
      paymentDue: tempPaymentDue,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    invoice.status === 'discard' ? discardClick() : addInvoice(invoice);
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
              autoComplete='off'
              required
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
                autoComplete='off'
                required
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
                autoComplete='off'
                required
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
                autoComplete='off'
                required
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
            autoComplete='off'
            required
            value={clientName}
            onChange={onInvoiceChange}
          />
          <p className='td-beautiful'>Client's Email</p>
          <input
            type='email'
            name='clientEmail'
            autoComplete='off'
            required
            value={clientEmail}
            onChange={onInvoiceChange}
          />
          <p className='td-beautiful'>Street Address</p>
          <input
            type='text'
            name='clientStreet'
            autoComplete='off'
            required
            value={clientStreet}
            onChange={onClientAddressChange}
          />
          <div id='bt-cityzipcountry'>
            <div>
              <p className='td-beautiful'>City</p>
              <input
                type='text'
                name='clientCity'
                autoComplete='off'
                required
                value={clientCity}
                onChange={onClientAddressChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Post Code</p>
              <input
                type='text'
                name='clientPostCode'
                autoComplete='off'
                required
                value={clientPostCode}
                onChange={onClientAddressChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Country</p>
              <input
                type='text'
                name='clientCountry'
                autoComplete='off'
                required
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
                autoComplete='off'
                required
                value={createdAt}
                onChange={onInvoiceChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Payment Terms</p>
              <div id='payment-terms-drop'>
                <div id='term-arrow'>
                  <p>
                    {paymentTerms === 1
                      ? 'Net 1 day'
                      : paymentTerms === 7
                      ? 'Net 7 days'
                      : paymentTerms === 30
                      ? 'Net 30 days'
                      : ''}
                  </p>
                  <img
                    src={require('../../images/icon-arrow-down.svg').default}
                    alt='icon-arrow-down'
                  />
                </div>
                <div id='dropdown-items' onClick={onTermsClick}>
                  <p id='day'>Net 1 day</p>
                  <p id='week'>Net 7 days</p>
                  <p id='month'>Net 30 days</p>
                </div>
              </div>
            </div>
          </div>
          <p className='td-beautiful'>Project Description</p>
          <input
            type='text'
            name='description'
            autoComplete='off'
            required
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
              required
              autoComplete='off'
              value={itemName}
              onChange={onItemsChange}
            />
            <input
              type='text'
              id='qty-input'
              name='itemQty'
              autoComplete='off'
              required
              value={itemQty}
              onChange={onItemsChange}
            />
            <input
              type='text'
              id='price-input'
              name='itemPrice'
              autoComplete='off'
              required
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
            onMouseOver={onMouseOver}
          />
          <div id='save-btns'>
            <input
              type='submit'
              name='draft'
              value='Save as Draft'
              className='form-btn draft'
              onMouseOver={onMouseOver}
            />
            <input
              type='submit'
              name='pending'
              value='Save & Send'
              className='form-btn send'
              onMouseOver={onMouseOver}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;

import React, { useState, useEffect, useContext } from 'react';
import ItemsCard from './ItemsCard';
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
    street: '',
    city: '',
    postCode: '',
    country: '',
  });
  const [clientAddress, setClientAddress] = useState({
    street: '',
    city: '',
    postCode: '',
    country: '',
  });
  const [item, setItem] = useState({
    itemId: '',
    name: '',
    quantity: '',
    price: '',
    total: 0,
  });
  const [items, setItems] = useState([]);

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

  const onItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onAddItemClick = (e) => {
    let temp =
      items.length > 0 ? parseInt(items[items.length - 1].itemId) + 1 : 0;
    setItems(
      items.concat({
        ...item,
        itemId: temp,
        total: (item.quantity * item.price).toFixed(2),
      })
    );
    setItem({ name: '', quantity: '', price: '', total: 0 });
  };

  const onMouseOver = (e) => {
    setInvoice({ ...invoice, status: e.target.name });
  };

  const onTermsClick = (e) => {
    const tempPaymentTerms =
      e.target.id === 'day'
        ? 1
        : e.target.id === 'week'
        ? 7
        : e.target.id === 'two-weeks'
        ? 14
        : 30;

    const tempPaymentDue = incrementDate(createdAt, tempPaymentTerms + 1);

    setInvoice({
      ...invoice,
      paymentTerms: tempPaymentTerms,
      paymentDue: tempPaymentDue,
    });
  };

  const onDeleteItemClick = (e) => {
    let temp = parseInt(e.target.id);
    setItems(items.filter((item) => item.itemId !== temp));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    invoice.status === 'discard'
      ? discardClick()
      : addInvoice(invoice, senderAddress, clientAddress, items);
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
              name='street'
              autoComplete='off'
              required
              value={senderAddress.street}
              onChange={onSenderAddressChange}
            />
          </div>
          <div id='ni-city-zip-country'>
            <div id='city'>
              <p className='td-beautiful'>City</p>
              <input
                type='text'
                id='ni-from-city'
                name='city'
                autoComplete='off'
                required
                value={senderAddress.city}
                onChange={onSenderAddressChange}
              />
            </div>
            <div id='zip'>
              <p className='td-beautiful'>Post Code</p>
              <input
                type='text'
                id='ni-from-zip'
                name='postCode'
                autoComplete='off'
                required
                value={senderAddress.postCode}
                onChange={onSenderAddressChange}
              />
            </div>
            <div id='country'>
              <p className='td-beautiful'>Country</p>
              <input
                type='text'
                id='ni-from-country'
                name='country'
                autoComplete='off'
                required
                value={senderAddress.country}
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
            placeholder='e.g. email@example.com'
            required
            value={clientEmail}
            onChange={onInvoiceChange}
          />
          <p className='td-beautiful'>Street Address</p>
          <input
            type='text'
            name='street'
            autoComplete='off'
            required
            value={clientAddress.street}
            onChange={onClientAddressChange}
          />
          <div id='bt-cityzipcountry'>
            <div>
              <p className='td-beautiful'>City</p>
              <input
                type='text'
                name='city'
                autoComplete='off'
                required
                value={clientAddress.city}
                onChange={onClientAddressChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Post Code</p>
              <input
                type='text'
                name='postCode'
                autoComplete='off'
                required
                value={clientAddress.postCode}
                onChange={onClientAddressChange}
              />
            </div>
            <div>
              <p className='td-beautiful'>Country</p>
              <input
                type='text'
                name='country'
                autoComplete='off'
                required
                value={clientAddress.country}
                onChange={onClientAddressChange}
              />
            </div>
          </div>
          <div id='td-date-terms'>
            <div id='td-date'>
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
            <div id='td-terms'>
              <p className='td-beautiful'>Payment Terms</p>
              <div id='payment-terms-drop'>
                <div id='term-arrow'>
                  <p>
                    {paymentTerms === 1
                      ? 'Net 1 day'
                      : paymentTerms === 7
                      ? 'Net 7 days'
                      : paymentTerms === 14
                      ? 'Net 14 days'
                      : 'Net 30 days'}
                  </p>
                  <img
                    src={require('../../images/icon-arrow-down.svg').default}
                    alt='icon-arrow-down'
                  />
                </div>
                <div id='dropdown-items' onClick={onTermsClick}>
                  <p id='day'>Net 1 day</p>
                  <p id='week'>Net 7 days</p>
                  <p id='two-weeks'>Net 14 days</p>
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
            placeholder='e.g. Graphic Design Service'
            required
            value={description}
            onChange={onInvoiceChange}
          />
        </div>
        <div id='ni-item-list'>
          <p className='modal-big-title'>Item List</p>
          <div id='modal-item-list-header'>
            <p id='header1' className='td-beautiful'>
              Item Name
            </p>
            <p id='header2' className='td-beautiful'>
              Qty.
            </p>
            <p id='header3' className='td-beautiful'>
              Price
            </p>
            <p id='header4' className='td-beautiful'>
              Total
            </p>
            <p id='header5'></p>
          </div>
          {items.length > 0
            ? items.map((item, i) => (
                <ItemsCard
                  key={i}
                  item={item}
                  onDelBtnClick={onDeleteItemClick}
                  onItemChange={onItemChange}
                />
              ))
            : null}
          <div id='modal-item-list-inputs'>
            <input
              type='text'
              id='item-name-input'
              name='name'
              autoComplete='off'
              value={item.name}
              onChange={onItemChange}
            />
            <input
              type='number'
              min='1'
              id='qty-input'
              name='quantity'
              autoComplete='off'
              value={item.quantity}
              onChange={onItemChange}
            />
            <input
              type='number'
              min='0.01'
              step='0.01'
              id='price-input'
              name='price'
              autoComplete='off'
              value={item.price}
              onChange={onItemChange}
            />
            <p className='td-beautiful'>
              {item.quantity > 0 && item.price > 0
                ? (item.quantity * item.price).toFixed(2)
                : 0}
            </p>
            <div style={{ visibility: 'hidden' }}>
              <img
                src={require('../../images/icon-delete.svg').default}
                alt='icon-delete'
              />
            </div>
          </div>
          <div id='modal-add-new-item' onClick={onAddItemClick}>
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
            formNoValidate
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

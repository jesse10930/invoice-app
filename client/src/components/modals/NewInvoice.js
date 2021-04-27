import React, { useState, useEffect, useContext, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ItemsCard from './ItemsCard';
import InvoiceContext from '../../context/invoice/invoiceContext';
import DarkContext from '../../context/dark/darkContext';
import AlertContext from '../../context/alert/alertContext';

const NewInvoice = () => {
  // Context
  const invoiceContext = useContext(InvoiceContext);
  const darkContext = useContext(DarkContext);
  const alertContext = useContext(AlertContext);

  const {
    addInvoice,
    discardClick,
    currentUser,
    cancelEditClick,
    saveChangesClick,
  } = invoiceContext;
  const { dark } = darkContext;
  // const { alert, setAlertState } = alertContext;

  // Set Initial State
  const [invoice, setInvoice] = useState({
    id: '',
    createdAt: '',
    paymentDue: '',
    description: '',
    paymentTerms: 30,
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
  const [items, setItems] = useState([]);
  const [save, setSave] = useState(true);
  const [inputAlert, setInputAlert] = useState(false);
  const [itemAlert, setItemAlert] = useState(false);

  // Destructure State
  const {
    createdAt,
    description,
    paymentTerms,
    clientName,
    clientEmail,
  } = invoice;

  // Effect to set date/payment due
  useEffect(() => {
    let d = new Date();
    let day =
      ('' + d.getDate()).length < 2 ? '0' + d.getDate() : '' + d.getDate();
    let month =
      ('' + (d.getMonth() + 1)).length < 2
        ? '0' + (d.getMonth() + 1)
        : '' + (d.getMonth() + 1);
    let year = d.getFullYear();
    let initPaymentDue = incrementDate(new Date(), 30);

    setInvoice({
      ...invoice,
      createdAt: [year, month, day].join('-'),
      paymentDue: initPaymentDue,
    });
    // eslint-disable-next-line
  }, []);

  // effect to Set State if CurrentUser
  useEffect(() => {
    if (currentUser) {
      setInvoice({
        id: currentUser.id,
        createdAt: currentUser.createdAt,
        paymentDue: currentUser.paymentDue,
        description: currentUser.description,
        paymentTerms: currentUser.paymentTerms,
        clientName: currentUser.clientName,
        clientEmail: currentUser.clientEmail,
        status: currentUser.status,
        total: currentUser.total,
      });

      setSenderAddress(currentUser.senderAddress);

      setClientAddress(currentUser.clientAddress);

      let newCurUserItems = currentUser.items.map((item) => ({
        ...item,
        itemId: uuidv4(),
      }));

      setItems(newCurUserItems);
    }
    // eslint-disable-next-line
  }, []);

  // Bill From
  const onSenderAddressChange = (e) =>
    setSenderAddress({
      ...senderAddress,
      [e.target.name]: e.target.value,
    });

  // Bill To
  const onInvoiceChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const onClientAddressChange = (e) =>
    setClientAddress({
      ...clientAddress,
      [e.target.name]: e.target.value,
    });

  // Payment Terms and Date
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

  // Items List and Add Item Btn
  const onAddItemClick = (e) => {
    let tempId = uuidv4();

    setItems(
      items.concat({
        itemId: tempId,
        name: '',
        quantity: '',
        price: '',
        total: (0).toFixed(2),
      })
    );
  };

  const updateItems = (thisItem) => {
    const newItems = items.map((item) => {
      if (item.itemId === thisItem.itemId) {
        item = thisItem;
      }
      return item;
    });
    setItems(newItems);
  };

  const deleteItem = (delState, thisItem) => {
    if (delState) {
      setItems(items.filter((item) => item.itemId !== thisItem.itemId));
    }
  };

  // Discard, Save, Send btns
  const onMouseOver = (e) => {
    setInvoice({ ...invoice, status: e.target.name });
  };

  // Cancel Button
  const onMouseEnter = (e) => {
    setSave(false);
  };
  const onMouseOut = (e) => {
    setSave(true);
  };

  // New Invoice Validation
  const addValidate = () => {
    if (items.length === 0) {
      setItemAlert(true);
    } else {
      addInvoice(invoice, senderAddress, clientAddress, items);
    }
  };

  // Edit Invoice Validation
  const editValidate = () => {
    if (items.length === 0) {
      setItemAlert(true);
    } else {
      let tempTotal = 0;
      items.forEach((item) => (tempTotal += parseFloat(item.total)));

      invoice.status === 'draft' && (invoice.status = 'pending');
      invoice.senderAddress = senderAddress;
      invoice.clientAddress = clientAddress;
      invoice.items = items;
      invoice.total = tempTotal;
      saveChangesClick(
        currentUser,
        invoice
        // senderAddress,
        // clientAddress,
        // items
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    !currentUser
      ? invoice.status === 'discard'
        ? discardClick()
        : invoice.status === 'pending'
        ? addValidate()
        : addInvoice(invoice, senderAddress, clientAddress, items)
      : !save
      ? cancelEditClick()
      : editValidate();
  };

  // Render
  return (
    <div id='new-invoice-modal' className='back-drop'>
      <div id='tester-for-modal' className={dark && 'dark'}>
        <p id='new-invoice-title' className={dark && 'dark'}>
          {currentUser ? `Edit ${currentUser.id}` : 'New Invoice'}
        </p>
        <form onSubmit={onSubmit}>
          <div id='ni-bill-from'>
            <p className='modal-sec-title'>Bill From</p>
            <div id='street-address'>
              <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                Street Address
              </p>
              <input
                className={dark && 'dark'}
                type='text'
                id='ni-sa-input'
                name='street'
                autoComplete='off'
                value={senderAddress.street}
                onChange={onSenderAddressChange}
              />
            </div>
            <div id='ni-city-zip-country'>
              <div id='city'>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  City
                </p>
                <input
                  className={dark && 'dark'}
                  type='text'
                  id='ni-from-city'
                  name='city'
                  autoComplete='off'
                  value={senderAddress.city}
                  onChange={onSenderAddressChange}
                />
              </div>
              <div id='zip'>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  Post Code
                </p>
                <input
                  className={dark && 'dark'}
                  type='text'
                  id='ni-from-zip'
                  name='postCode'
                  autoComplete='off'
                  value={senderAddress.postCode}
                  onChange={onSenderAddressChange}
                />
              </div>
              <div id='country'>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  Country
                </p>
                <input
                  className={dark && 'dark'}
                  type='text'
                  id='ni-from-country'
                  name='country'
                  autoComplete='off'
                  value={senderAddress.country}
                  onChange={onSenderAddressChange}
                />
              </div>
            </div>
          </div>
          <div id='ni-bill-to'>
            <p className='modal-sec-title'>Bill To</p>
            <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
              Client's Name
            </p>
            <input
              className={dark && 'dark'}
              type='text'
              name='clientName'
              autoComplete='off'
              value={clientName}
              onChange={onInvoiceChange}
            />
            <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
              Client's Email
            </p>
            <input
              className={dark && 'dark'}
              type='email'
              name='clientEmail'
              autoComplete='off'
              placeholder='e.g. email@example.com'
              value={clientEmail}
              onChange={onInvoiceChange}
            />
            <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
              Street Address
            </p>
            <input
              className={dark && 'dark'}
              type='text'
              name='street'
              autoComplete='off'
              value={clientAddress.street}
              onChange={onClientAddressChange}
            />
            <div id='bt-cityzipcountry'>
              <div>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  City
                </p>
                <input
                  className={dark && 'dark'}
                  type='text'
                  name='city'
                  autoComplete='off'
                  value={clientAddress.city}
                  onChange={onClientAddressChange}
                />
              </div>
              <div>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  Post Code
                </p>
                <input
                  className={dark && 'dark'}
                  type='text'
                  name='postCode'
                  autoComplete='off'
                  value={clientAddress.postCode}
                  onChange={onClientAddressChange}
                />
              </div>
              <div>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  Country
                </p>
                <input
                  className={dark && 'dark'}
                  type='text'
                  name='country'
                  autoComplete='off'
                  value={clientAddress.country}
                  onChange={onClientAddressChange}
                />
              </div>
            </div>
            <div id='td-date-terms'>
              <div id='td-date'>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  Invoice Date
                </p>
                <input
                  className={dark && 'dark'}
                  type='date'
                  name='createdAt'
                  autoComplete='off'
                  value={createdAt}
                  onChange={onInvoiceChange}
                />
              </div>
              <div id='td-terms'>
                <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                  Payment Terms
                </p>
                <div id='payment-terms-drop' className={dark && 'dark'}>
                  <div id='term-arrow'>
                    <p className={dark && 'dark'}>
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
                  <div
                    id='dropdown-items'
                    className={dark && 'dark'}
                    onClick={onTermsClick}
                  >
                    <p id='day' className={dark && 'dark'}>
                      Net 1 day
                    </p>
                    <p id='week' className={dark && 'dark'}>
                      Net 7 days
                    </p>
                    <p id='two-weeks' className={dark && 'dark'}>
                      Net 14 days
                    </p>
                    <p id='month' className={dark && 'dark'}>
                      Net 30 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
              Project Description
            </p>
            <input
              className={dark && 'dark'}
              type='text'
              name='description'
              autoComplete='off'
              placeholder='e.g. Graphic Design Service'
              value={description}
              onChange={onInvoiceChange}
            />
          </div>
          <div id='ni-item-list'>
            <p className='modal-big-title'>Item List</p>
            <div id='modal-item-list-header'>
              <p
                id='header1'
                className={dark ? 'dark td-beautiful' : 'td-beautiful'}
              >
                Item Name
              </p>
              <p
                id='header2'
                className={dark ? 'dark td-beautiful' : 'td-beautiful'}
              >
                Qty.
              </p>
              <p
                id='header3'
                className={dark ? 'dark td-beautiful' : 'td-beautiful'}
              >
                Price
              </p>
              <p
                id='header4'
                className={dark ? 'dark td-beautiful' : 'td-beautiful'}
              >
                Total
              </p>
              <p id='header5'></p>
            </div>
            {items.length > 0
              ? items.map((item) => (
                  <ItemsCard
                    key={item.itemId}
                    item={item}
                    deleteItem={deleteItem}
                    updateItems={updateItems}
                  />
                ))
              : null}
            <div
              id='modal-add-new-item'
              onClick={onAddItemClick}
              className={dark && 'dark'}
            >
              <img
                src={require('../../images/icon-plus.svg').default}
                alt='icon-plus'
              />
              <p style={{ marginLeft: '5px' }}>Add New Item</p>
            </div>
          </div>
          <div id='alert-messages'>
            {inputAlert ? (
              <div id='field-alert'>
                <p className='alert-text'>-All fields must be added</p>
              </div>
            ) : null}
            {itemAlert ? (
              <div id='item-alert'>
                <p className='alert-text'>-An item must be added</p>
              </div>
            ) : null}
          </div>
          <div id='ni-bot-btns'>
            {!currentUser ? (
              <Fragment>
                <input
                  type='submit'
                  name='discard'
                  value='Discard'
                  className={
                    dark ? 'form-btn discard dark' : 'form-btn discard'
                  }
                  onMouseOver={onMouseOver}
                  formNoValidate
                />
                <div id='save-btns'>
                  <input
                    type='submit'
                    name='draft'
                    value='Save as Draft'
                    className={dark ? 'form-btn draft dark' : 'form-btn draft'}
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
              </Fragment>
            ) : (
              <Fragment>
                <div id='change-btns'>
                  <input
                    type='submit'
                    name='cancel'
                    value='Cancel'
                    className='form-btn cancel'
                    onMouseEnter={onMouseEnter}
                    onMouseOut={onMouseOut}
                    formNoValidate
                  />
                  <input
                    type='submit'
                    name='changes'
                    value='Save Changes'
                    className='form-btn change'
                    // onMouseOver={onMouseOver}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoice;

import React from 'react';

const NewInvoice = () => {
  return (
    <div id='new-invoice-modal'>
      <p id='new-invoice-title'>New Invoice</p>
      <form action=''>
        <div id='ni-bill-from'>
          <p className='modal-sec-title'>Bill From</p>
          <div id='street-address'>
            <p className='td-beautiful'>Street Address</p>
            <input type='text' id='ni-sa-input' />
          </div>
          <div id='ni-city-zip-country'>
            <div id='city'>
              <p className='td-beautiful'>City</p>
              <input type='text' id='ni-from-city' />
            </div>
            <div id='zip'>
              <p className='td-beautiful'>Post Code</p>
              <input type='text' id='ni-from-zip' />
            </div>
            <div id='country'>
              <p className='td-beautiful'>Country</p>
              <input type='text' id='ni-from-country' />
            </div>
          </div>
        </div>
        <div id='ni-bill-to'>
          <p className='modal-sec-title'>Bill To</p>
          <p className='td-beautiful'>Client's Name</p>
          <input type='text' className='full' />
          <p className='td-beautiful'>Client's Email</p>
          <input type='text' className='full' />
          <p className='td-beautiful'>Street Address</p>
          <input type='text' className='full' />
          <div id='bt-cityzipcountry'>
            <div>
              <p className='td-beautiful'>City</p>
              <input type='text' className='third' />
            </div>
            <div>
              <p className='td-beautiful'>Post Code</p>
              <input type='text' className='third' />
            </div>
            <div>
              <p className='td-beautiful'>Country</p>
              <input type='text' className='third' />
            </div>
          </div>
          <div id='td-date-terms'>
            <div>
              <p className='td-beautiful'>Invoice Date</p>
              <input type='text' className='half' />
            </div>
            <div>
              <p className='td-beautiful'>Payment Terms</p>
              <input type='text' className='half' />
            </div>
          </div>
          <p className='td-beautiful'>Project Description</p>
          <input type='text' className='full' />
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
            <input type='text' id='item-name-input' />
            <input type='text' id='qty-input' />
            <input type='text' id='price-input' />
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
            <p>Add New Item</p>
          </div>
        </div>
        <div id='ni-bot-btns'>
          <div id='discard-btn'>
            <p>Discard</p>
          </div>
          <div id='save-btns'>
            <div id='draft-btn'>
              <p>Save as Draft</p>
            </div>
            <div id='send-btn'>
              <p>Save & Send</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;

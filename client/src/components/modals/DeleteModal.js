import React, { useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';
import DarkContext from '../../context/dark/darkContext';

const DeleteModal = () => {
  const invoiceContext = useContext(InvoiceContext);
  const darkContext = useContext(DarkContext);

  const { dark } = darkContext;

  const {
    cancelDeleteClick,
    onConfirmDeleteClick,
    currentUser,
  } = invoiceContext;

  return (
    <div id='delete-modal-container' className='back-drop'>
      <div id='delete-modal' className={dark && 'dark'}>
        <p id='dm-heading' className={dark && 'dark'}>
          Confirm Deletion
        </p>
        <p id='dm-question' className={dark && 'dark'}>
          Are you sure you want to delete invoice{' '}
          <span style={{ color: '#7E88C3' }}>#</span>
          {currentUser.id}? This action cannot be undone.
        </p>
        <div id='dm-btns'>
          <div
            id='dm-cancel'
            className={dark ? 'dark form-btn' : 'form-btn'}
            onClick={cancelDeleteClick}
          >
            <p id='cancel' className={dark && 'dark'}>
              Cancel
            </p>
          </div>
          <div
            id='dm-delete'
            className='form.btn'
            onClick={() => onConfirmDeleteClick(currentUser)}
          >
            <p id='delete'>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

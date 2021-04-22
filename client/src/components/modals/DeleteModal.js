import React, { useContext } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';

const DeleteModal = () => {
  const invoiceContext = useContext(InvoiceContext);

  const {
    cancelDeleteClick,
    onConfirmDeleteClick,
    currentUser,
  } = invoiceContext;

  return (
    <div id='delete-modal-container' className='back-drop'>
      <div id='delete-modal'>
        <p id='dm-heading'>Confirm Deletion</p>
        <p id='dm-question'>
          Are you sure you want to delete invoice {currentUser.id}? This action
          cannot be undone.
        </p>
        <div id='dm-btns'>
          <div id='dm-cancel' className='form-btn' onClick={cancelDeleteClick}>
            <p id='cancel'>Cancel</p>
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

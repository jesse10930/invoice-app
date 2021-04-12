import React from 'react';

const DeleteModal = () => {
  return (
    <div id='delete-modal'>
      <p id='dm-heading'>Confirm Deletion</p>
      <p id='dm-question'>
        Are you sure you want to delete invoice #XM9141? This action cannot be
        undone.
      </p>
      <div id='dm-btns'>
        <div id='dm-cancel'>
          <p id='cancel'>Cancel</p>
        </div>
        <div id='dm-delete'>
          <p id='delete'>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

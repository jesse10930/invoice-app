import React from 'react';

const Details = ({ currentUser }) => {
  const { status } = currentUser;

  console.log(currentUser);

  return (
    <div id='details-container'>
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
      <div id='details-card'></div>
    </div>
  );
};

export default Details;

import React from 'react';

const FilterModal = () => {
  return (
    <div id='filter-modal' style={{ display: 'none' }}>
      <ul>
        <li>
          <input id='check' type='checkbox'></input>
          <p>Draft</p>
        </li>
        <li>
          <input type='checkbox'></input> <p>Pending</p>
        </li>
        <li>
          <input type='checkbox'></input> <p>Paid</p>
        </li>
      </ul>
    </div>
  );
};

export default FilterModal;

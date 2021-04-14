import React from 'react';

const ItemsCard = ({ item, itemId, onDelBtnClick, onItemChange }) => {
  const { name, quantity, price, total } = item;
  return (
    <div id={'modal-item-list-inputs-' + { itemId }}>
      <input
        type='text'
        id={'item-name-input-' + { itemId }}
        style={{ width: '215px' }}
        name='name'
        required
        autoComplete='off'
        value={name}
        onChange={onItemChange}
      />
      <input
        type='number'
        min='1'
        id={'qty-input-' + { itemId }}
        style={{ width: '50px' }}
        name='quantity'
        required
        autoComplete='off'
        value={quantity}
        onChange={onItemChange}
      />
      <input
        type='number'
        min='0.01'
        step='0.01'
        id={'price-input-' + { itemId }}
        style={{ width: '50px' }}
        name='price'
        required
        autoComplete='off'
        value={price}
        onChange={onItemChange}
      />
      <p className='td-beautiful'>{total}</p>
      <div onClick={onDelBtnClick}>
        <img
          id={name}
          src={require('../../images/icon-delete.svg').default}
          alt='icon-delete'
        />
      </div>
    </div>
  );
};

export default ItemsCard;

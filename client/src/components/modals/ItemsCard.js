import React, { useState } from 'react';

const ItemsCard = ({ item, onDelBtnClick, updateItems }) => {
  const { name, quantity, price, total, itemId } = item;

  const [thisItem, setThisItem] = useState({
    name: name,
    quantity: quantity,
    price: price,
    total: total,
    itemId: itemId,
  });

  const onThisItemChange = (e) => {
    setThisItem({ ...thisItem, [e.target.name]: e.target.value });
    updateItems(thisItem);
  };

  return (
    <div id={'modal-item-list-inputs-' + { itemId }}>
      <input
        type='text'
        id={'item-name-input-' + { itemId }}
        style={{ width: '215px' }}
        name='name'
        required
        autoComplete='off'
        value={thisItem.name}
        // onChange={onItemChange}
        onChange={onThisItemChange}
      />
      <input
        type='number'
        min='1'
        id={'qty-input-' + { itemId }}
        style={{ width: '50px' }}
        name='quantity'
        required
        autoComplete='off'
        value={thisItem.quantity}
        // onChange={onItemChange}
        onChange={onThisItemChange}
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
        value={thisItem.price}
        // onChange={onItemChange}
        onChange={onThisItemChange}
      />
      <p className='td-beautiful'>
        {thisItem.quantity > 0 && thisItem.price > 0
          ? (thisItem.quantity * thisItem.price).toFixed(2)
          : 0.0}
      </p>
      <div onClick={onDelBtnClick}>
        <img
          id={itemId}
          src={require('../../images/icon-delete.svg').default}
          alt='icon-delete'
        />
      </div>
    </div>
  );
};

export default ItemsCard;

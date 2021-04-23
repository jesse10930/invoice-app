import React, { useState, useEffect, useContext } from 'react';
import DarkContext from '../../context/dark/darkContext';

const ItemsCard = ({ item, deleteItem, updateItems }) => {
  const darkContext = useContext(DarkContext);

  const { name, quantity, price, total, itemId } = item;

  const [thisItem, setThisItem] = useState({
    name: name,
    quantity: quantity,
    price: price,
    total: total,
    itemId: itemId,
  });

  const [delState, setDelState] = useState(false);

  useEffect(() => {
    updateItems(thisItem);
  }, [thisItem]);

  useEffect(() => {
    deleteItem(delState, thisItem);
  }, [delState]);

  const onThisItemChange = (e) => {
    let tempTot;
    if (e.target.name === 'quantity' && thisItem.price > 0) {
      tempTot = (
        parseFloat(e.target.value) * parseFloat(thisItem.price)
      ).toFixed(2);
    } else if (e.target.name === 'price' && thisItem.quantity > 0) {
      tempTot = (
        parseFloat(e.target.value) * parseFloat(thisItem.quantity)
      ).toFixed(2);
    } else {
      tempTot = thisItem.total;
    }
    setThisItem({
      ...thisItem,
      [e.target.name]: e.target.value,
      total: tempTot,
    });
  };

  const onThisItemDelBtnClick = (e) => {
    setDelState(true);
  };

  return (
    <div id={'modal-item-list-inputs-' + itemId}>
      <input
        type='text'
        id={'item-name-input-' + itemId}
        style={{ width: '215px' }}
        name='name'
        required
        autoComplete='off'
        value={thisItem.name}
        onChange={onThisItemChange}
      />
      <input
        type='number'
        min='1'
        id={'qty-input-' + itemId}
        style={{ width: '50px' }}
        name='quantity'
        required
        autoComplete='off'
        value={thisItem.quantity}
        onChange={onThisItemChange}
      />
      <input
        type='number'
        min='0.01'
        step='0.01'
        id={'price-input-' + itemId}
        style={{ width: '50px' }}
        name='price'
        required
        autoComplete='off'
        value={thisItem.price}
        onChange={onThisItemChange}
      />
      <p className='td-beautiful'>
        {thisItem.quantity > 0 && thisItem.price > 0
          ? (thisItem.quantity * thisItem.price).toFixed(2)
          : 0.0}
      </p>
      <div id={itemId} onClick={onThisItemDelBtnClick}>
        {/* <img
          id={itemId}
          src={require('../../images/icon-delete.svg').default}
          alt='icon-delete'
        /> */}
        <svg width='13' height='16' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
            fillRule='nonzero'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ItemsCard;

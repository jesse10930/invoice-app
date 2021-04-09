import React from 'react';

const InvoiceItem = ({ key, invoice }) => {
  const {
    id,
    createdAt,
    paymentDue,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    // senderAddress,
    // clientAddress,
    // items,
    total,
  } = invoice;

  return (
    <div id={'invoice-' + { key }} className='invoice-item'>
      <ul>
        <li>{id}</li>
        <li>{createdAt}</li>
        <li>{paymentDue}</li>
        <li>{paymentTerms}</li>
        <li>{clientName}</li>
        <li>{clientEmail}</li>
        <li>{status}</li>
        {/* <li>{senderAddress}</li> */}
        {/* <li>{clientAddress}</li> */}
        {/* <li>{items}</li> */}
        <li>{total}</li>
      </ul>
    </div>
  );
};

export default InvoiceItem;

import React, { useContext } from 'react';

export default function Invoice({ invoice }) {
  const { id, paymentDue, clientName, total, status } = invoice;
  return (
    <button className='invoice-flex-container-and-btn'>
      <h4 className='id-container'>
        <span>#</span> {id}
      </h4>

      <div className='body-2 due-date'>Due {paymentDue}</div>
      <h4 className='total'>£{total.toFixed(2)}</h4>
      <div className='body-2 name'>{clientName}</div>
      <div className='status'>
        <div className='circle-container'></div>
        {status}
      </div>

      {/* <button>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icon-arrow-right.svg`}
          alt=''
        />
      </button> */}
    </button>
  );
}

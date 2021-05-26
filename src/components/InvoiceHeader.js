import React, { useContext } from 'react';
import { InvoiceContext } from '../App';

export default function InvoiceHeader() {
  const { invoices, dayTheme, setDayTheme } = useContext(InvoiceContext);

  return (
    <div className='invoice-details-container'>
      <div className='no-of-invoices-container'>
        <h2>Invoices</h2>
        <div className='body-2'>
          There are <span>{invoices.length}</span> total invoices{' '}
        </div>
      </div>
      <div className='filter-container'>
        <h4>Filter</h4>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icon-arrow-down.svg`}
          alt=''
        />
      </div>
      <button className='new-invoice-btn'>
        <div className='button-circle'>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icon-plus.svg`}
            alt='new invoice'
          />
        </div>
        <h4>New</h4>
      </button>
    </div>
  );
}

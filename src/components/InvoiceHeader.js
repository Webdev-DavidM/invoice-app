import React, { useContext, useState } from 'react';
import { InvoiceContext } from '../App';
import Media from 'react-media';
import { CSSTransition } from 'react-transition-group';

export default function InvoiceHeader() {
  const { invoices, dayTheme, setDayTheme } = useContext(InvoiceContext);
  const [showDropDown, setToggleDropDown] = useState(false);
  return (
    <div className='invoice-header-container'>
      <div className='no-of-invoices-container'>
        <h2>Invoices</h2>
        <div className='body-2'>
          <Media
            query='(min-width: 768px)'
            render={() => <span>There are </span>}
          />
          <span>{invoices.length} </span>
          <Media query='(min-width: 768px)' render={() => <span>total</span>} />
          <span> invoices</span>
        </div>
      </div>
      <div className='filter-container'>
        <button
          onClick={() =>
            setToggleDropDown((prevToggleState) => !prevToggleState)
          }>
          <h4>
            Filter
            <Media
              query='(min-width: 768px)'
              render={() => <span> By Status</span>}
            />
          </h4>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icon-arrow-down.svg`}
            alt=''
          />
        </button>
        <CSSTransition
          in={showDropDown}
          timeout={500}
          classNames='alert'
          unmountOnExit>
          <div className='drop-down-container'>
            <label className='draft'>
              <input type='checkbox' />
              <h4>Draft</h4>
            </label>
            <label className='pending'>
              <input type='checkbox' />
              <h4>Pending</h4>
            </label>
            <label className='paid'>
              <input type='checkbox' />
              <h4>Paid</h4>
            </label>
          </div>
        </CSSTransition>
      </div>
      <button className='new-invoice-btn'>
        <div className='button-circle'>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icon-plus.svg`}
            alt='new invoice'
          />
        </div>
        <h4>New </h4>
        <Media
          query='(min-width: 768px)'
          render={() => <h4>&nbsp; Invoice</h4>}
        />
      </button>
    </div>
  );
}

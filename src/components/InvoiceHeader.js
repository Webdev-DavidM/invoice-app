import React, { useContext, useState } from 'react';
import { InvoiceContext } from '../App';
import Media from 'react-media';
import { CSSTransition } from 'react-transition-group';
import styles from './InvoiceHeader.module.scss';

export default function InvoiceHeader() {
  const { setFilterInvoices, invoices, displayNewInvoice } =
    useContext(InvoiceContext);
  const [showDropDown, setToggleDropDown] = useState(false);
  return (
    <div className={styles.invoice_header_container}>
      <div className={styles.no_of_invoices_container}>
        <h2>Invoices</h2>
        <div className={styles.body_2}>
          <Media
            query='(min-width: 768px)'
            render={() => <span>There are </span>}
          />
          <span>{invoices.length} </span>
          <Media query='(min-width: 768px)' render={() => <span>total</span>} />
          <span> invoices</span>
        </div>
      </div>
      <div className={styles.filter_container}>
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
          <div className={styles.drop_down_container}>
            <label className='draft'>
              <input
                onChange={() => setFilterInvoices('draft')}
                type='radio'
                name='filter'
              />
              <h4>Draft</h4>
            </label>
            <label className='pending'>
              <input
                onChange={() => setFilterInvoices('pending')}
                type='radio'
                name='filter'
              />
              <h4>Pending</h4>
            </label>
            <label className='paid'>
              <input
                onChange={() => setFilterInvoices('paid')}
                type='radio'
                name='filter'
              />
              <h4>Paid</h4>
            </label>
            <label className='paid'>
              <input
                onChange={() => setFilterInvoices('none')}
                type='radio'
                name='filter'
              />
              <h4>All</h4>
            </label>
          </div>
        </CSSTransition>
      </div>
      <button
        onClick={() => displayNewInvoice()}
        className={styles.new_invoice_btn}>
        <div className={styles.button_circle}>
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

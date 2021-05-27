import React, { useContext, useEffect, useState } from 'react';
import Media from 'react-media';
import { InvoiceContext } from '../App';
import { formatDateUK } from '../helpers/formatDate';
import { CSSTransition } from 'react-transition-group';

export default function Invoice({ invoice }) {
  const { id, paymentDue, clientName, total, status } = invoice;
  const { chosenInvoice, showInvoices } = useContext(InvoiceContext);
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const formatDate = formatDateUK(paymentDue);
    setFormattedDate(formatDate);
  }, [paymentDue]);

  return (
    <>
      <CSSTransition
        in={showInvoices}
        timeout={500}
        mountOnEnter
        classNames='invoices-move'
        unmountOnExit>
        <div
          onClick={() => chosenInvoice(id, false)}
          className='invoice-flex-container-and-btn'>
          <h4 className='id-container'>
            <span>#</span> {id}
          </h4>
          <div className='due-date body-2'>{formattedDate}</div>

          <h4 className='total'>£{total.toFixed(2)}</h4>
          <div className='body-2 name'>{clientName}</div>
          <div className='status-pending'>
            <div className='circle-container'></div>
            {status}
          </div>
          <Media
            query='(min-width: 768px)'
            render={() => (
              <button>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icon-arrow-right.svg`}
                  alt=''
                />
              </button>
            )}
          />
        </div>
      </CSSTransition>
    </>
  );
}

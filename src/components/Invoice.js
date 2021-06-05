import React, { useContext, useEffect, useState } from 'react';
import Media from 'react-media';
import { InvoiceContext } from '../App';
import { formatDateUK } from '../helpers/formatDate';
import { CSSTransition } from 'react-transition-group';
import styles from './Invoice.module.scss';

export default function Invoice({ invoice }) {
  const { id, paymentDue, clientName, total, status } = invoice;
  const { chosenInvoice, showInvoices } = useContext(InvoiceContext);
  const [formattedDate, setFormattedDate] = useState(null);

  // useEffect(() => {
  //   console.log(paymentDue);
  //   const formatDate = formatDateUK(paymentDue);
  //   setFormattedDate(formatDate);
  // }, [paymentDue]);

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
          className={styles.invoice_flex_container_and_btn}>
          <h4 className={styles.id_container}>
            <span>#</span> {id}
          </h4>
          <div className={(styles.due_date, styles.body_2)}>
            {/* {formattedDate} */}
          </div>

          <h4 className={styles.total}>£{total}</h4>
          <div className={(styles.body_2, styles.name)}>{clientName}</div>
          <div className={styles.status_pending}>
            <div className={styles.circle_container}></div>
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

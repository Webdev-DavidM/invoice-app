import React, { useContext, useEffect, useState } from 'react';
import { InvoiceContext } from '../App';
import { formatDateUK } from '../helpers/formatDate';
import Media from 'react-media';

export default function InvoiceDetails() {
  const [dueDate, setDueDate] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState(null);

  const { goBack, selectedInvoice } = useContext(InvoiceContext);
  const {
    status,
    id,
    clientEmail,
    clientName,
    clientAddress,
    senderAddress,
    paymentDue,
    createdAt,
    items,
    total,
    description,
  } = selectedInvoice[0];

  useEffect(() => {
    let dueDate = formatDateUK(paymentDue);
    setDueDate(dueDate);
    let invoiceDate = formatDateUK(createdAt);
    setInvoiceDate(invoiceDate);
  }, [paymentDue, createdAt]);
  console.log(items);

  return (
    <>
      <div className='invoice-details-container'>
        <h2 className='go-back-section '>
          <button onClick={() => goBack()}>
            {' '}
            <img
              src={`${process.env.PUBLIC_URL}/assets/icon-arrow-left.svg`}
              alt='go back'
            />
            &nbsp; &nbsp; &nbsp;
            <h4>Go back</h4>{' '}
          </button>
        </h2>

        <div className='status-and-button'>
          <h4>status</h4>
          <div className='status-button'>
            <div className='circle-container'></div>
            {status}
          </div>
          <Media
            query='(min-width: 768px)'
            render={() => {
              return (
                <>
                  <button className='edit-button'>Edit</button>
                  <button className='delete-button'>Delete</button>
                  <button className='paid-button'>Mark as paid</button>
                </>
              );
            }}
          />
        </div>
        <div className='main-info-flex-container'>
          <h4 className='id-container'>
            <span>#</span> {id}
            <Media
              query='(min-width: 768px)'
              render={() => {
                return <div className='body-2 description'>{description}</div>;
              }}
            />
          </h4>
          <div className='address'>
            <div className='body-2'>{senderAddress.street}</div>
            <div className='body-2'>{senderAddress.city}</div>
            <div className='body-2'>{senderAddress.postCode}</div>
            <div className='body-2'>{senderAddress.country}</div>
          </div>
          <div className='payment-dates'>
            <div className='body-2 invoice'>Invoice Date</div>
            <h4>{invoiceDate}</h4>
            <div className='body-2 payment'>Payment Date</div>
            <h4>{dueDate}</h4>
          </div>
          <div className='invoice-address'>
            <div className='body-2'>Bill To</div>
            <h4>{clientName}</h4>
            <div className='body-2'>{clientAddress.street}</div>
            <div className='body-2'>{clientAddress.city}</div>
            <div className='body-2'>{clientAddress.postCode}</div>
            <div className='body-2'>{clientAddress.country}</div>
            <div className='body-2'></div>
          </div>
          <div className='email'>
            <div className='body-2'>Sent to:</div>
            <h4>{clientEmail}</h4>
          </div>

          <div className='sub-total-and-total-container'>
            <Media
              query='(min-width: 768px)'
              render={() => {
                return (
                  <div className='titles-container'>
                    <div className='body-2 item'>Item Name</div>
                    <div className='body-2 qty'>QTY</div>
                    <div className='body-2 price'>Price</div>
                    <div className='body-2 total'>Total</div>
                  </div>
                );
              }}
            />
            {items.map((item) => (
              <div className='invoice-item'>
                <h4 className='invoice-name'>{item.name}</h4>
                <h4 className='invoice-quantity'>
                  {item.quantity}
                  <Media
                    query='(max-width: 768px)'
                    render={() => {
                      return <> x £{item.price.toFixed(2)}</>;
                    }}
                  />
                </h4>
                <Media
                  query='(min-width: 768px)'
                  render={() => {
                    return (
                      <h4 className='invoice-unit-price'>
                        £ {item.price.toFixed(2)}
                      </h4>
                    );
                  }}
                />
                <h4 className='invoice-price'>
                  £&nbsp;{(item.price * item.quantity).toFixed(2)}
                </h4>
              </div>
            ))}
          </div>
          <div className='grand-total'>
            <div className='body-2'>Grand Total</div>
            <h2>£&nbsp; {total.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <Media
        query='(max-width: 768px)'
        render={() => {
          return (
            <div className='fixed-buttons'>
              <button className='edit-button'>Edit</button>
              <button className='delete-button'>Delete</button>
              <button className='paid-button'>Mark as paid</button>
            </div>
          );
        }}
      />
    </>
  );
}

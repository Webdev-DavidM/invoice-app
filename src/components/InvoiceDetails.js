import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../App";
import Media from "react-media";
import styles from "./InvoiceDetails.module.scss";
import formatDate from "./invoiceHelpers/formatDate";
import generateCreatedAt from "./invoiceHelpers/generateCreatedAt";

export default function InvoiceDetails() {
  const {
    goBackDetails,
    selectedInvoice,
    markAsPaid,
    editInvoice,
    showDeleteModal,
  } = useContext(InvoiceContext);
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

  const button_style =
    status === "paid"
      ? styles.paid_btn
      : status === "draft"
      ? styles.draft_btn
      : styles.pending_btn;

  return (
    <>
      <div className={styles.invoice_details_container}>
        <h2 className={styles.go_back_section}>
          <button onClick={() => goBackDetails()}>
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/assets/icon-arrow-left.svg`}
              alt="go back"
            />
            &nbsp; &nbsp; &nbsp;
            <h4>Go back</h4>{" "}
          </button>
        </h2>

        <div className={styles.status_and_button}>
          <h4>status</h4>
          <div className={button_style}>
            <div className={styles.circle_container}></div>
            {status}
          </div>
          <Media
            query="(min-width: 768px)"
            render={() => {
              return (
                <>
                  <button
                    onClick={() => editInvoice()}
                    className={styles.edit_button}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => showDeleteModal(id)}
                    className={styles.delete_button}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => markAsPaid(id)}
                    className={styles.paid_button}
                  >
                    Mark as paid
                  </button>
                </>
              );
            }}
          />
        </div>
        <div className={styles.main_info_flex_container}>
          <h4 className={styles.id_container}>
            <span>#</span> {id}
            <Media
              query="(min-width: 768px)"
              render={() => {
                return (
                  <div className={(styles.body_2, styles.description)}>
                    {description}
                  </div>
                );
              }}
            />
          </h4>
          <div className={styles.address}>
            <div className={styles.body_2}>{senderAddress.street}</div>
            <div className={styles.body_2}>{senderAddress.city}</div>
            <div className={styles.body_2}>{senderAddress.postCode}</div>
            <div className={styles.body_2}>{senderAddress.country}</div>
          </div>
          <div className={styles.payment_dates}>
            <div className={(styles.body_2, styles.invoice)}>Invoice Date</div>
            <h4>{createdAt}</h4>
            <div className={(styles.body_2, styles.payment)}>Payment Date</div>
            <h4>{paymentDue}</h4>
          </div>
          <div className={styles.invoice_address}>
            <div className={styles.body_2}>Bill To</div>
            <h4>{clientName}</h4>
            <div className={styles.body_2}>{clientAddress.street}</div>
            <div className={styles.body_2}>{clientAddress.city}</div>
            <div className={styles.body_2}>{clientAddress.postCode}</div>
            <div className={styles.body_2}>{clientAddress.country}</div>
            <div className={styles.body_2}></div>
          </div>
          <div className={styles.email}>
            <div className={styles.body_2}>Sent to:</div>
            <h4>{clientEmail}</h4>
          </div>

          <div className={styles.sub_total_and_total_container}>
            <Media
              query="(min-width: 768px)"
              render={() => {
                return (
                  <div className={styles.titles_container}>
                    <div className={(styles.body_2, styles.item)}>
                      Item Name
                    </div>
                    <div className={(styles.body_2, styles.qty)}>QTY</div>
                    <div className={(styles.body_2, styles.price)}>Price</div>
                    <div className={(styles.body_2, styles.total)}>Total</div>
                  </div>
                );
              }}
            />
            {items.map((item, index) => (
              <div key={index} className={styles.invoice_item}>
                <h4 className={styles.invoice_name}>{item.name}</h4>
                <h4 className={styles.invoice_quantity}>
                  {item.quantity}
                  <Media
                    query="(max-width: 768px)"
                    render={() => {
                      return <> x £{parseInt(item).price.toFixed(2) | 0}</>;
                    }}
                  />
                </h4>
                <Media
                  query="(min-width: 768px)"
                  render={() => {
                    return (
                      <h4 className={styles.invoice_unit_price}>
                        £ {parseInt(item.price).toFixed(2) | 0}
                      </h4>
                    );
                  }}
                />
                <h4 className={styles.invoice_price}>
                  £&nbsp;{parseInt(item.price * item.quantity).toFixed(2) | 0}
                </h4>
              </div>
            ))}
          </div>
          <div className={styles.grand_total}>
            <div className={styles.body_2}>Grand Total</div>
            <h2>£&nbsp; {parseInt(total).toFixed(2) | 0}</h2>
          </div>
        </div>
      </div>
      <Media
        query="(max-width: 768px)"
        render={() => {
          return (
            <div className={styles.fixed_buttons}>
              <button
                onClick={() => editInvoice()}
                className={styles.edit_button}
              >
                Edit
              </button>
              <button
                onClick={() => showDeleteModal(id)}
                className={styles.delete_button}
              >
                Delete
              </button>
              <button
                onClick={() => markAsPaid(id)}
                className={styles.paid_button}
              >
                Mark as paid
              </button>
            </div>
          );
        }}
      />
    </>
  );
}

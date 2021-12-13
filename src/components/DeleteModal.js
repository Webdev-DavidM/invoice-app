import React, { useContext } from "react";
import { InvoiceContext } from "../App";

export default function DeleteModal() {
  const { setDeleteModal, deleteInvoice, selectedInvoice } =
    useContext(InvoiceContext);

  return (
    <div className="delete_modal_flex_container">
      <div className="modal_container">
        <h2>Confirm deletion</h2>
        <div className="body_1">
          Are you sure you want to delete{" "}
          {selectedInvoice.length !== 0 && selectedInvoice[0].id}? This action
          cannot be undone.
        </div>
        <h4 className="button_container">
          <div onClick={() => setDeleteModal(false)} className="cancel_btn">
            Cancel
          </div>
          <div onClick={() => deleteInvoice()} className="delete_btn">
            Delete
          </div>
        </h4>
      </div>
    </div>
  );
}

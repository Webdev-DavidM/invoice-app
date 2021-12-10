import React, { useContext, useEffect, useState } from "react";
import { getIn, useFormik, FormikProvider, FieldArray, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InvoiceContext } from "../App";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./EditOrCreateInvoice.module.scss";
import { validationSchema } from "././invoiceHelpers/validationSchema";

export default function EditInvoice() {
  const [paymentTermsState, setPaymentTermsState] = useState(30);

  const [itemError, setItemError] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  let { selectedInvoice, invoiceToUpdate, cancel, goBackEditOrCreate } =
    useContext(InvoiceContext);

  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    senderAddress: { street, city, postCode, country },
    clientAddress,
    status,
    items,
    total,
  } = selectedInvoice[0];

  const validateItems = (values) => {
    if (values.items.length > 0) {
      return true;
    } else {
      setItemError(true);
      return false;
    }
  };

  const formik = useFormik({
    // I can use the initial value beow to prefill the form if i am editing it.
    initialValues: {
      id,
      createdAt,
      paymentDue,
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status,
      senderAddress: {
        street: street,
        city: city,
        postCode: postCode,
        country: country,
      },
      clientAddress: {
        street: clientAddress.street,
        city: clientAddress.city,
        postCode: clientAddress.postCode,
        country: clientAddress.country,
      },
      items,
      total,
    },
    enableReinitialize: true,
    validationSchema: validationSchema(),

    onSubmit: (values) => {
      // we need to iterate through the items and create a total and pass this to total
      console.log(values.items.length);

      if (validateItems(values)) {
        let total =
          values.items.length > 1
            ? values.items.reduce((total, item) => {
                let subtotal = parseInt(item.price) * item.quantity;
                return total + subtotal;
              }, 0)
            : parseInt(values.items[0].price) * values.items[0].quantity;
        const valuesWithPaymentTermFromState = {
          ...values,
          total: total,
          paymentTerms: paymentTermsState,
        };
        invoiceToUpdate(valuesWithPaymentTermFromState);
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const resetForm = () => {
    formik.resetForm();
    cancel();
  };

  return (
    <div className={styles.invoice_edit_create_container}>
      {/* The formikProvider component takes in my react useFormik hook and gives all the values and methods to the components  */}
      <FormikProvider value={formik}>
        <Form
          style={{ display: "flex", flexWrap: "wrap" }}
          onSubmit={formik.handleSubmit}
          // fullWidth
        >
          <button
            onClick={() => goBackEditOrCreate()}
            style={{ display: "flex", color: "black", width: "100%" }}
          >
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/assets/icon-arrow-left.svg`}
              alt="go back"
            />
            &nbsp; &nbsp; &nbsp;
            <h4 style={{ color: "black" }}>Go back</h4>{" "}
          </button>
          <h2>
            Edit <span className={styles.edit_hash}>#</span>
            {id}
          </h2>
          <Grid container spacing={3}>
            <Grid item xs={12} p>
              <h4 className={styles.heading}>Bill From</h4>
              <h4>Street</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="senderAddress.street"
                name="senderAddress.street"
                value={formik.values.senderAddress.street}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "senderAddress.street") &&
                  Boolean(getIn(formik.errors, "senderAddress.street"))
                }
                helperText={
                  getIn(formik.touched, "senderAddress.street") &&
                  getIn(formik.errors, "senderAddress.street")
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>City</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="senderAddress.city"
                name="senderAddress.city"
                value={formik.values.senderAddress.city}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "senderAddress.city") &&
                  Boolean(getIn(formik.errors, "senderAddress.city"))
                }
                helperText={
                  getIn(formik.touched, "senderAddress.city") &&
                  getIn(formik.errors, "senderAddress.city")
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>Post Code</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="senderAddress.postCode"
                name="senderAddress.postCode"
                value={formik.values.senderAddress.postCode}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "senderAddress.postCode") &&
                  Boolean(getIn(formik.errors, "senderAddress.postCode"))
                }
                helperText={
                  getIn(formik.touched, "senderAddress.postCode") &&
                  getIn(formik.errors, "senderAddress.postCode")
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <h4>Country</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="senderAddress.country"
                name="senderAddress.country"
                value={formik.values.senderAddress.country}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "senderAddress.country") &&
                  Boolean(getIn(formik.errors, "senderAddress.country"))
                }
                helperText={
                  getIn(formik.touched, "senderAddress.country") &&
                  getIn(formik.errors, "senderAddress.country")
                }
              />
            </Grid>

            <Grid item xs={12}>
              <h4 className={styles.heading}>Bill To</h4>
              <h4>Client Name</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="clientName"
                name="clientName"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                error={
                  formik.touched.clientName && Boolean(formik.errors.clientName)
                }
                helperText={
                  formik.touched.clientName && formik.errors.clientName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Client E-mail</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="clientEmail"
                name="clientEmail"
                value={formik.values.clientEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.clientEmail &&
                  Boolean(formik.errors.clientEmail)
                }
                helperText={
                  formik.touched.clientEmail && formik.errors.clientEmail
                }
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Client Address</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="clientAddress.street"
                name="clientAddress.street"
                value={formik.values.clientAddress.street}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "clientAddress.street") &&
                  Boolean(getIn(formik.errors, "clientAddress.street"))
                }
                helperText={
                  getIn(formik.touched, "clientAddress.street") &&
                  getIn(formik.errors, "clientAddress.street")
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>City</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="clientAddress.city"
                name="clientAddress.city"
                value={formik.values.clientAddress.city}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "clientAddress.city") &&
                  Boolean(getIn(formik.errors, "clientAddress.city"))
                }
                helperText={
                  getIn(formik.touched, "clientAddress.city") &&
                  getIn(formik.errors, "clientAddress.city")
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>Post Code</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="clientAddress.postCode"
                name="clientAddress.postCode"
                value={formik.values.clientAddress.postCode}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, "clientAddress.postCode") &&
                  Boolean(getIn(formik.errors, "clientAddress.postCode"))
                }
                helperText={
                  getIn(formik.touched, "clientAddress.postCode") &&
                  getIn(formik.errors, "clientAddress.postCode")
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <h4>Country</h4>
              <TextField
                fullWidth
                variant="outlined"
                id="clientAddress.country"
                name="clientAddress.country"
                value={formik.values.clientAddress.country}
                onChange={formik.handleChange}
                error={
                  formik.touched.clientAddress &&
                  Boolean(formik.errors.clientAddress)
                }
                helperText={
                  formik.touched.clientAddress && formik.errors.clientAddress
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Invoice Due</h4>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                id="paymentDue"
                name="paymentDue"
                defaultValue={paymentDue}
                value={formik.values.paymentDue}
                onChange={formik.handleChange}
                error={
                  formik.touched.paymentDue && Boolean(formik.errors.paymentDue)
                }
                helperText={
                  formik.touched.paymentDue && formik.errors.paymentDue
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Payment terms</h4>
              <Select
                fullWidth
                id="demo-controlled-open-select"
                open={open}
                variant="outlined"
                onClose={handleClose}
                displayEmpty
                onOpen={handleOpen}
                value={paymentTermsState}
                onChange={(e) => setPaymentTermsState(e.target.value)}
              >
                {[1, 7, 14, 30].map((paymentTerm, index) => {
                  if (paymentTerm !== paymentTerms) {
                    return (
                      <MenuItem value={paymentTerm} key={index}>
                        <h4 style={{ color: "black", paddingBottom: "0" }}>
                          Net {paymentTerm}
                          {paymentTerm === 1 ? (
                            <span> Day</span>
                          ) : (
                            <span> Days</span>
                          )}
                        </h4>
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem selected={true} key={index}>
                        {" "}
                        <h4 style={{ color: "black", paddingBottom: "0" }}>
                          Net {paymentTerms}
                          {paymentTerms === 1 ? (
                            <span> Day</span>
                          ) : (
                            <span> Days</span>
                          )}
                        </h4>
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <h4>Project description</h4>
              <TextField
                fullWidth
                type="description"
                variant="outlined"
                id="description"
                name="description"
                defaultValue={description}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>

            <Grid
              item
              // container

              xs={12}
            >
              <h3>Item List</h3>
              {itemError && <p>Please provide an item to bill</p>}
            </Grid>

            {/* <Form> */}
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <>
                  <Grid container>
                    {formik.values.items &&
                      formik.values.items.length > 0 &&
                      formik.values.items.map((item, index) => (
                        <Grid
                          container
                          key={index}
                          spacing={3}
                          m={2}
                          style={{ margin: "1rem 0" }}
                        >
                          <Grid item xs={6} md={3}>
                            <h4>Item Name</h4>
                            <TextField
                              fullWidth
                              variant="outlined"
                              id={`items.${index}.name`}
                              name={`items.${index}.name`}
                              value={formik.values.items[index].name}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <h4>Qty</h4>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id={`items.${index}`.quantity}
                              name={`items[${index}].quantity`}
                              value={formik.values.items[index].quantity}
                              style={{ border: "1px solid transparent" }}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <h4>Price</h4>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id={`items.${index}.price`}
                              name={`items[${index}].price`}
                              value={formik.values.items[index].price}
                              style={{ border: "1px solid transparent" }}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <h4>Total</h4>
                            <TextField
                              disabled={true}
                              variant="outlined"
                              className={styles.total}
                              fullWidth
                              id={`items.${index}.total`}
                              name={`items[${index}].total`}
                              value={
                                formik.values.items[index].price *
                                formik.values.items[index].quantity
                              }
                              style={{ border: "1px solid transparent" }}
                              onChange={formik.handleChange}
                            />
                          </Grid>

                          <Grid
                            item
                            className={styles.delete_btn}
                            style={{
                              alignItems: "center",
                              justifyContent: "flex-end",
                              marginTop: "1rem",
                              paddingRight: "0",
                            }}
                            xs={2}
                            md={1}
                          >
                            <button
                              onClick={() => {
                                arrayHelpers.remove(index);
                                setOpen(true);
                              }}
                            >
                              <DeleteIcon />
                            </button>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                  <Grid xs={12}>
                    <button
                      className={styles.add_new_item_btn}
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          quantity: "",
                          price: "",
                          total: "",
                        })
                      }
                    >
                      + Add New Item
                    </button>
                  </Grid>
                </>
              )}
            />

            <Grid
              // xs={12}
              container
              style={{ margin: "1rem 0" }}
            >
              <button
                style={{ marginLeft: "auto" }}
                className={styles.cancel_btn}
                onClick={() => resetForm()}
              >
                Cancel
              </button>
              <button type="submit" className={styles.save_changes_btn}>
                Save Changes
              </button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

import React, { useContext } from "react";
import { useFormik, FormikProvider, FieldArray, Form, getIn } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InvoiceContext } from "../App";
import validateItems from "./invoiceHelpers/validateItems";
import calculateTotal from "./invoiceHelpers/calculateTotal";
import { validationSchema } from "././invoiceHelpers/validationSchema";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./EditOrCreateInvoice.module.scss";

export default function NewInvoice() {
  const [itemError, setItemError] = React.useState(null);
  const [itemDetailsError, setItemDetailsError] = React.useState(null);

  let { newInvoice, addNewInvoiceToState, cancel } = useContext(InvoiceContext);

  const formik = useFormik({
    //As the formik docs say the items array ( ie field array component) is difficult to validate so I will validate it here instead

    // I can use the initial value beow to prefill the form if i am editing it.
    initialValues: newInvoice,
    enableReinitialize: true,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      if (validateItems(values)) {
        setItemError(null);
        let total = calculateTotal(values);
        if (isNaN(total) | (total === "0")) {
          return setItemDetailsError(true);
        } else {
          const valueToSubmit = {
            ...values,
            total: total,
          };
          addNewInvoiceToState(valueToSubmit);
        }
      } else {
        setItemError(true);
      }
    },
  });

  const resetAndCancel = () => {
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
        >
          <h2>New Invoice</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                  getIn(formik.touched, "clientAddress.country") &&
                  Boolean(getIn(formik.errors, "clientAddress.country"))
                }
                helperText={
                  getIn(formik.touched, "clientAddress.country") &&
                  getIn(formik.errors, "clientAddress.country")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Invoice Due</h4>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                id="paymentDue"
                name="paymentDue"
                value={formik.values.paymentDue}
                onChange={formik.handleChange}
                error={formik.touched.paymentDue && formik.errors.paymentDue}
                helperText={
                  formik.touched.paymentDue && formik.errors.paymentDue
                }
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Project description</h4>
              <TextField
                fullWidth
                type="description"
                variant="outlined"
                id="description"
                name="description"
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

            <Grid container>
              <h3>Item List</h3>
            </Grid>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <>
                  <Grid>
                    {formik.values.items &&
                      formik.values.items.length > 0 &&
                      formik.values.items.map((item, index) => (
                        <Grid
                          container
                          spacing={3}
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
                          <Grid item="true" xs={4} md={2}>
                            <h4>Total</h4>
                            <TextField
                              disabled={true}
                              variant="outlined"
                              className={styles.total}
                              fullWidth
                              id={`items.${index}.total`}
                              name={`items[${index}].total`}
                              value={
                                (parseInt(formik.values.items[index].price) *
                                  parseInt(
                                    formik.values.items[index].quantity
                                  )) |
                                0
                              }
                              style={{ border: "1px solid transparent" }}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid
                            item
                            container
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
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <DeleteIcon />
                            </button>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                  <Grid item xs={12}>
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
            {itemError && (
              <p className={styles.item_error}>
                Please provide an item to bill
              </p>
            )}
            {itemDetailsError && (
              <p className={styles.item_error}>
                Please fill out all the fields wioth correct values to create a
                total
              </p>
            )}

            <Grid container style={{ margin: "1rem 0" }}>
              <button
                type="button"
                className={styles.cancel_btn}
                onClick={() => resetAndCancel()}
              >
                Discard
              </button>
              <button type="submit" className={styles.save_changes_btn}>
                Save and Send
              </button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

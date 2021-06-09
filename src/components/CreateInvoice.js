import React, { useContext, useEffect, useState } from 'react';

import { useFormik, FormikProvider, FieldArray, Form, getIn } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { InvoiceContext } from '../App';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { validationSchema } from '././invoiceHelpers/validationSchema';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './EditOrCreateInvoice.module.scss';

export default function NewInvoice() {
  const [paymentTermsState, setPaymentTermsState] = useState(30);

  const [open, setOpen] = React.useState(false);

  let { newInvoice, addNewInvoiceToState, goBackEditOrCreate, cancel } =
    useContext(InvoiceContext);

  useEffect(() => {
    setPaymentTermsState(newInvoice.paymentTerms);
  }, [newInvoice]);

  const { id, createdAt, paymentTerms } = newInvoice;

  const formik = useFormik({
    // I can use the initial value beow to prefill the form if i am editing it.
    initialValues: newInvoice,
    enableReinitialize: true,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      const valuesWithPaymentTermFromState = {
        ...values,
        paymentTerms: paymentTermsState,
      };
      addNewInvoiceToState(valuesWithPaymentTermFromState);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const resetAndCancel = () => {
    formik.resetForm();
    cancel();
  };

  console.log(formik);

  return (
    <div className={styles.invoice_edit_create_container}>
      {/* The formikProvider component takes in my react useFormik hook and gives all the values and methods to the components  */}
      <FormikProvider value={formik}>
        <Form
          style={{ display: 'flex', flexWrap: 'wrap' }}
          onSubmit={formik.handleSubmit}
          fullWidth>
          <h2>New Invoice</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} p>
              <h4 className={styles.heading}>Bill From</h4>
              <h4>Street</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='senderAddress.street'
                name='senderAddress.street'
                value={formik.values.senderAddress.street}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'senderAddress.street') &&
                  Boolean(getIn(formik.errors, 'senderAddress.street'))
                }
                helperText={
                  getIn(formik.touched, 'senderAddress.street') &&
                  getIn(formik.errors, 'senderAddress.street')
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>City</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='senderAddress.city'
                name='senderAddress.city'
                value={formik.values.senderAddress.city}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'senderAddress.city') &&
                  Boolean(getIn(formik.errors, 'senderAddress.city'))
                }
                helperText={
                  getIn(formik.touched, 'senderAddress.city') &&
                  getIn(formik.errors, 'senderAddress.city')
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>Post Code</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='senderAddress.postCode'
                name='senderAddress.postCode'
                value={formik.values.senderAddress.postCode}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'senderAddress.postCode') &&
                  Boolean(getIn(formik.errors, 'senderAddress.postCode'))
                }
                helperText={
                  getIn(formik.touched, 'senderAddress.postCode') &&
                  getIn(formik.errors, 'senderAddress.postCode')
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <h4>Country</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='senderAddress.country'
                name='senderAddress.country'
                value={formik.values.senderAddress.country}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'senderAddress.country') &&
                  Boolean(getIn(formik.errors, 'senderAddress.country'))
                }
                helperText={
                  getIn(formik.touched, 'senderAddress.country') &&
                  getIn(formik.errors, 'senderAddress.country')
                }
              />
            </Grid>

            <Grid item xs={12}>
              <h4 className={styles.heading}>Bill To</h4>
              <h4>Client Name</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='clientName'
                name='clientName'
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
                variant='outlined'
                id='clientEmail'
                name='clientEmail'
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
                variant='outlined'
                id='clientAddress.street'
                name='clientAddress.street'
                value={formik.values.clientAddress.street}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'clientAddress.street') &&
                  Boolean(getIn(formik.errors, 'clientAddress.street'))
                }
                helperText={
                  getIn(formik.touched, 'clientAddress.street') &&
                  getIn(formik.errors, 'clientAddress.street')
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>City</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='clientAddress.city'
                name='clientAddress.city'
                value={formik.values.clientAddress.city}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'clientAddress.city') &&
                  Boolean(getIn(formik.errors, 'clientAddress.city'))
                }
                helperText={
                  getIn(formik.touched, 'clientAddress.city') &&
                  getIn(formik.errors, 'clientAddress.city')
                }
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <h4>Post Code</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='clientAddress.postCode'
                name='clientAddress.postCode'
                value={formik.values.clientAddress.postCode}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'clientAddress.postCode') &&
                  Boolean(getIn(formik.errors, 'clientAddress.postCode'))
                }
                helperText={
                  getIn(formik.touched, 'clientAddress.postCode') &&
                  getIn(formik.errors, 'clientAddress.postCode')
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <h4>Country</h4>
              <TextField
                fullWidth
                variant='outlined'
                id='clientAddress.country'
                name='clientAddress.country'
                value={formik.values.clientAddress.country}
                onChange={formik.handleChange}
                error={
                  getIn(formik.touched, 'clientAddress.country') &&
                  Boolean(getIn(formik.errors, 'clientAddress.country'))
                }
                helperText={
                  getIn(formik.touched, 'clientAddress.country') &&
                  getIn(formik.errors, 'clientAddress.country')
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Invoice Due</h4>
              <TextField
                fullWidth
                type='date'
                variant='outlined'
                id='paymentDue'
                name='paymentDue'
                defaultValue={formik.values.paymentDue}
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
                id='demo-controlled-open-select'
                open={open}
                variant='outlined'
                onClose={handleClose}
                displayEmpty
                onOpen={handleOpen}
                value={paymentTermsState}
                onChange={(e) => setPaymentTermsState(e.target.value)}>
                {[1, 7, 14, 30].map((paymentTerm, index) => {
                  if (paymentTerm !== paymentTerms) {
                    return (
                      <MenuItem value={paymentTerm} key={index}>
                        <h4 style={{ color: 'black', paddingBottom: '0' }}>
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
                      <MenuItem selected={true}>
                        {' '}
                        <h4 style={{ color: 'black', paddingBottom: '0' }}>
                          Net {paymentTerm}
                          {paymentTerm === 1 ? (
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
                type='description'
                variant='outlined'
                id='description'
                name='description'
                defaultValue={formik.values.description}
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

            <Grid item container xs={12}>
              <h3>Item List</h3>
            </Grid>

            {/* <Form> */}
            <FieldArray
              name='items'
              render={(arrayHelpers) => (
                <>
                  <Grid container item xs={12}>
                    {formik.values.items &&
                      formik.values.items.length > 0 &&
                      formik.values.items.map((item, index) => (
                        <Grid
                          container
                          item
                          xs={12}
                          spacing={3}
                          m={2}
                          style={{ margin: '1rem 0' }}>
                          <Grid item xs={6} md={3}>
                            <h4>Item Name</h4>
                            <TextField
                              fullWidth
                              variant='outlined'
                              id={`items.${index}`}
                              name={`items.${index}`}
                              value={formik.values.items[index].name}
                              onChange={formik.handleChange}
                              // error={
                              //   formik.touched.description &&
                              //   Boolean(formik.errors.description)
                              // }
                              // helperText={
                              //   formik.touched.description &&
                              //   formik.errors.description
                              // }
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <h4>Qty</h4>
                            <TextField
                              variant='outlined'
                              fullWidth
                              id={`items.${index}`.quantity}
                              name={`items[${index}].quantity`}
                              value={formik.values.items[index].quantity}
                              style={{ border: '1px solid transparent' }}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <h4>Price</h4>
                            <TextField
                              variant='outlined'
                              fullWidth
                              id={`items.${index}.price`}
                              name={`items[${index}].price`}
                              value={formik.values.items[index].price}
                              style={{ border: '1px solid transparent' }}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <h4>Total</h4>
                            <TextField
                              disabled={true}
                              variant='outlined'
                              className={styles.total}
                              fullWidth
                              id={`items.${index}.total`}
                              name={`items[${index}].total`}
                              value={
                                formik.values.items[index].price *
                                formik.values.items[index].quantity
                              }
                              style={{ border: '1px solid transparent' }}
                              onChange={formik.handleChange}
                            />
                          </Grid>

                          {/* </Grid> */}
                          <Grid
                            item
                            container
                            className={styles.delete_btn}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              marginTop: '1rem',
                              paddingRight: '0',
                            }}
                            xs={2}
                            md={1}>
                            {/* <h4>&nbsp;</h4> */}
                            <button onClick={() => arrayHelpers.remove(index)}>
                              <DeleteIcon />
                            </button>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                  <Grid xs={12}>
                    <button
                      className={styles.add_new_item_btn}
                      type='button'
                      onClick={() =>
                        arrayHelpers.push({
                          name: '',
                          quantity: '',
                          price: '',
                          total: '',
                        })
                      }>
                      {/* show this when user has removed all friends from the list */}
                      + Add New Item
                    </button>
                  </Grid>
                </>
              )}
            />

            <Grid xs={12} container style={{ margin: '1rem 0' }}>
              <button
                className={styles.cancel_btn}
                onClick={() => resetAndCancel()}>
                Discard
              </button>
              <button type='submit' className={styles.save_changes_btn}>
                Save and Send
              </button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

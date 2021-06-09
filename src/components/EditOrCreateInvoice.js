// import React, { useContext, useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import { InvoiceContext } from '../App';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';

// const validationSchema = yup.object().shape({
//   senderAddress: yup.object().shape({
//     street: yup.string().min(2, 'Too Short!'),
//   }),
//   clientName: yup.string().required('need this'),
//   clientEmail: yup.string().required('need this'),
// });

// export default function EditOrCreateInvoice() {
//   const [invoiceData, setInvoiceData] = useState();
//   const [open, setOpen] = React.useState(false);
//   let { selectedInvoice } = useContext(InvoiceContext);
//   const {
//     senderAddress: { street, city, postCode, country },
//     clientName,
//     clientEmail,
//     clientAddress,
//     paymentTerms,
//     paymentDue,
//     description,
//   } = selectedInvoice[0];

//   const formik = useFormik({
//     // I can use the initial value beow to prefill the form if i am editing it.
//     initialValues: {
//       senderAddress: {
//         street: street,
//         city: city,
//         postCode: postCode,
//         country: country,
//       },
//       clientAddress: {
//         street: clientAddress.street,
//         city: clientAddress.city,
//         postCode: clientAddress.postCode,
//         country: clientAddress.country,
//       },
//       paymentDue,
//       clientName,
//       clientEmail,
//       description,
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       setInvoiceData(values);
//     },
//   });

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   console.log(formik.values, formik.errors, formik.touched);

//   return (
//     <div style={{ width: '80%', margin: '3rem Auto' }}>
//       <form
//         style={{ display: 'flex', flexWrap: 'wrap' }}
//         onSubmit={formik.handleSubmit}
//         fullWidth>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <h4>Bill From</h4>
//             <h4>Street</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='senderAddress.street'
//               name='senderAddress.street'
//               value={formik.values.senderAddress.street}
//               // onChange={formik.handleChange}
//               // error={
//               //   formik.touched.senderAddress.street &&
//               //   Boolean(formik.errors.senderAddress.street)
//               // }
//               // helperText={
//               //   formik.touched.senderAddress.street &&
//               //   formik.errors.senderAddress.street
//               // }
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <h4>City</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='senderAddress.city'
//               name='senderAddress.city'
//               value={formik.values.senderAddress.city}
//               // onChange={formik.handleChange}
//               // error={
//               //   formik.touched.senderAddress.street &&
//               //   Boolean(formik.errors.senderAddress.street)
//               // }
//               // helperText={
//               //   formik.touched.senderAddress.street &&
//               //   formik.errors.senderAddress.street
//               // }
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <h4>Post Code</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='senderAddress.postCode'
//               name='senderAddress.postCode'
//               value={formik.values.senderAddress.postCode}
//               // onChange={formik.handleChange}
//               // error={
//               //   formik.touched.senderAddress.street &&
//               //   Boolean(formik.errors.senderAddress.street)
//               // }
//               // helperText={
//               //   formik.touched.senderAddress.street &&
//               //   formik.errors.senderAddress.street
//               // }
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <h4>Country</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='senderAddress.country'
//               name='senderAddress.country'
//               value={formik.values.senderAddress.country}
//               onChange={formik.handleChange}
//               // error={

//               //   formik.touched.senderAddress.street &&
//               //   Boolean(formik.errors.senderAddress.street)
//               // }
//               // helperText={

//               //   formik.touched.senderAddress.street &&
//               //   formik.errors.senderAddress.street
//               // }
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <h4>Bill To</h4>
//             <h4>Client Name</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='clientName'
//               name='clientName'
//               value={formik.values.clientName}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.clientName && Boolean(formik.errors.clientName)
//               }
//               helperText={formik.touched.clientName && formik.errors.clientName}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <h4>Client E-mail</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='clientEmail'
//               name='clientEmail'
//               value={formik.values.clientEmail}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.clientEmail && Boolean(formik.errors.clientEmail)
//               }
//               helperText={
//                 formik.touched.clientEmail && formik.errors.clientEmail
//               }
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <h4>Client Address</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='clientAddress.street'
//               name='clientAddress.street'
//               value={formik.values.clientAddress.street}
//               onChange={formik.handleChange}
//               // error={
//               //   formik.touched.clientAddress.street &&
//               //   Boolean(formik.errors.clientAddress.street)
//               // }
//               // helperText={
//               //   formik.touched.clientAddress.street &&
//               //   formik.errors.clientAddress.street
//               // }
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <h4>City</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='clientAddress.city'
//               name='clientAddress.city'
//               value={formik.values.clientAddress.city}
//               onChange={formik.handleChange}
//               // error={
//               //   formik.touched.clientAddress.street &&
//               //   Boolean(formik.errors.clientAddress.street)
//               // }
//               // helperText={
//               //   formik.touched.clientAddress.street &&
//               //   formik.errors.clientAddress.street
//               // }
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <h4>Post Code</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='clientAddress.postCode'
//               name='clientAddress.postCode'
//               value={formik.values.clientAddress.postCode}
//               onChange={formik.handleChange}
//               // error={
//               //   formik.touched.clientAddress.street &&
//               //   Boolean(formik.errors.clientAddress.street)
//               // }
//               // helperText={
//               //   formik.touched.clientAddress.street &&
//               //   formik.errors.clientAddress.street
//               // }
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <h4>Country</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='clientAddress.country'
//               name='clientAddress.country'
//               value={formik.values.clientAddress.country}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.clientAddress &&
//                 Boolean(formik.errors.clientAddress)
//               }
//               helperText={
//                 formik.touched.clientAddress && formik.errors.clientAddress
//               }
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <h4>Invoice Due</h4>
//             <TextField
//               fullWidth
//               type='date'
//               variant='outlined'
//               id='paymentDue'
//               name='paymentDue'
//               defaultValue={paymentDue}
//               value={formik.values.paymentDue}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.paymentDue && Boolean(formik.errors.paymentDue)
//               }
//               helperText={formik.touched.paymentDue && formik.errors.paymentDue}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <h4>Payment terms</h4>
//             <Select
//               fullWidth
//               id='demo-controlled-open-select'
//               open={open}
//               variant='outlined'
//               onClose={handleClose}
//               displayEmpty
//               onOpen={handleOpen}
//               value={formik.values.paymentTerms}
//               onChange={formik.handleChange}>
//               {[1, 7, 14, 30].map((paymentTerm) => {
//                 if (paymentTerm !== paymentTerms) {
//                   return (
//                     <MenuItem value={paymentTerm}>
//                       <h4>
//                         Net {paymentTerm}
//                         {paymentTerm === 1 ? (
//                           <span> Day</span>
//                         ) : (
//                           <span> Days</span>
//                         )}
//                       </h4>
//                     </MenuItem>
//                   );
//                 } else {
//                   return (
//                     <MenuItem selected={true}>
//                       {' '}
//                       <h4>
//                         Net {paymentTerms}
//                         {paymentTerms === 1 ? (
//                           <span> Day</span>
//                         ) : (
//                           <span> Days</span>
//                         )}
//                       </h4>
//                     </MenuItem>
//                   );
//                 }
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={12}>
//             <h4>Project description</h4>
//             <TextField
//               fullWidth
//               variant='outlined'
//               id='description'
//               name='description'
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.description && Boolean(formik.errors.description)
//               }
//               helperText={
//                 formik.touched.description && formik.errors.description
//               }
//             />
//           </Grid>
//           <Button color='primary' variant='contained' type='submit'>
//             Submit
//           </Button>
//         </Grid>
//       </form>
//     </div>
//   );
// }

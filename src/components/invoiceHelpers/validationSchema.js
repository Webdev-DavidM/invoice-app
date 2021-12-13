import * as yup from "yup";

export const validationSchema = () =>
  yup.object().shape({
    senderAddress: yup.object().shape({
      street: yup
        .string()
        .min(3)
        .required("Please enter an address, minimum 3 characters"),
      city: yup
        .string()
        .min(3)
        .required("Please enter a city, minimum 3 characters"),
      postCode: yup
        .string()
        .min(3)
        .required("Please enter a postCode, minimum 3 characters"),
      country: yup
        .string()
        .min(3)
        .required("Please enter a country, minimum 3 characters"),
    }),
    clientAddress: yup.object().shape({
      street: yup
        .string()
        .min(3)
        .required("Please enter an address, minimum 3 characters"),
      city: yup
        .string()
        .min(3)
        .required("Please enter a city, minimum 3 characters"),
      postCode: yup
        .string()
        .min(3)
        .required("Please enter a postCode, minimum 3 characters"),
      country: yup
        .string()
        .min(3)
        .required("Please enter a country, minimum 3 characters"),
    }),
    paymentDue: yup
      .string()
      .min(3)
      .required("Please select a invoice due date"),
    description: yup.string().min(3).required("Please enter a description"),
    clientName: yup.string().min(3).required("Please enter a client name"),
    clientEmail: yup.string().min(3).required("Please enter a client email"),
  });

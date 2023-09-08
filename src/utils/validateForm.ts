import * as yup from "yup";

export const FormValidator = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Client name is empty")
    .min(4, "The name is too short"),
  business: yup.string().trim().required("Business name is empty"),
  email: yup
    .string()
    .email()
    .required("Email is empty")
    .min(8, "The email is too short"),
  date: yup.string().trim().required("Date is empty"),
  description: yup.string().trim(),
  id: yup.string().trim(),
});

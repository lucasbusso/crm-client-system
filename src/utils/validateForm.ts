import * as yup from "yup";

export const FormValidator = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  businessName: yup.string().trim().required(),
  email: yup.string().email().required(),
  phone: yup.string().email().required(),
  userId: yup.string().trim(),
});

import * as yup from "yup";

export const checkoutSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Please enter a full address"),

  city: yup.string().required("City is required"),

  zip: yup
    .string()
    .required("ZIP code is required")
    .matches(/^\d{5}$/, "ZIP code must be 5 digits"),

  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),

  expiryDate: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY"),

  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

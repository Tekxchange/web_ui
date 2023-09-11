import * as yup from "yup";

export default yup.object().shape({
  title: yup.string().required(),
  price: yup.number().typeError("Input type must be a number").min(0).required(),
  description: yup.string().required(),
  pictures: yup.array().notRequired(),
  country: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
});

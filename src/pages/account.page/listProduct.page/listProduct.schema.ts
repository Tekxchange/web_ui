import * as yup from "yup";

export default yup.object().shape({
  title: yup.string().required(),
  price: yup.number().min(0).required(),
  description: yup.string().required(),
  pictures: yup.array().notRequired(),
});

import * as yup from "yup";

export default yup.object().shape({
  min: yup.number().min(0).notRequired().nullable().default(0),
  max: yup.number().min(0).notRequired().nullable().default(0),
});

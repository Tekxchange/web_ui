import * as yup from "yup";

export interface IRegisterSchema {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const required = "This is a required field";

export default yup.object<IRegisterSchema>().shape({
  username: yup.string().required(required),
  password: yup.string().required(required),
  confirmPassword: yup
    .string()
    .required(required)
    .oneOf([yup.ref("password"), ""], "You passwords must match"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required(required),
});

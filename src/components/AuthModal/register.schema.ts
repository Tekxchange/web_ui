import * as yup from "yup";

export interface IRegisterSchema {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default yup.object<IRegisterSchema>().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), '']),
  email: yup.string().email().required(),
});

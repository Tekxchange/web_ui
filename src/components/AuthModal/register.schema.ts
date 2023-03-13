import * as yup from "yup";

export interface IRegisterSchema {
  username: string;
  password: string;
  email: string;
}

export default yup.object<IRegisterSchema>().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
});

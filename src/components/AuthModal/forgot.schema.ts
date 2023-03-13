import * as yup from "yup";

export interface IForgotSchema {
  email: string;
}

export default yup.object<IForgotSchema>().shape({
  email: yup.string().required().email(),
});

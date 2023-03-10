import * as yup from "yup";

export interface ILoginSchema {
  username: string;
  password: string;
}

export default yup.object<ILoginSchema>().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

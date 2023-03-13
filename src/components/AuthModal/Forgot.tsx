import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";
import { useState } from "react";
import useFormValidator from "../../utils/useFormValidator";
import forgotSchema, { IForgotSchema } from "./forgot.schema";

const initialFormValues: IForgotSchema = {
  email: "",
};

export default function ForgotPassword() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const { formErrors, onChange } = useFormValidator(
    formValues,
    setFormValues,
    forgotSchema
  );

  return (
    <form className={c`flex flex-col`}>
      <Input
        id="email"
        label="Email"
        name="email"
        errorText={formErrors.email}
        onChange={onChange}
      />
      <div className={c`self-center mt-2`}>
        <Button buttonColor={ButtonColor.Gold} cta buttonText="Submit" />
      </div>
    </form>
  );
}

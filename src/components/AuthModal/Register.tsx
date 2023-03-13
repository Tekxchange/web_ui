import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";
import React, { useState } from "react";
import registerSchema, { IRegisterSchema } from "./register.schema";
import useFormValidator from "../../utils/useFormValidator";

const initialFormValues: IRegisterSchema = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

export default function Register() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const { onChange, formErrors } = useFormValidator(
    formValues,
    setFormValues,
    registerSchema
  );

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <form className={c`flex flex-col`} onSubmit={onSubmit}>
      <Input
        id="username"
        label="Username"
        name="username"
        errorText={formErrors.username}
        onChange={onChange}
      />
      <Input
        id="email"
        label="Email"
        name="email"
        onChange={onChange}
        errorText={formErrors.email}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        name="password"
        errorText={formErrors.password}
        onChange={onChange}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        errorText={formErrors.confirmPassword}
        onChange={onChange}
      />
      <div className={c`self-center mt-2`}>
        <Button buttonText="Submit" buttonColor={ButtonColor.Gold} cta />
      </div>
    </form>
  );
}

import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";
import React, { useState } from "react";
import registerSchema, { IRegisterSchema } from "./register.schema";
import useFormValidator from "../../utils/useFormValidator";

const initialFormValues: IRegisterSchema = {
  email: "",
  password: "",
  username: "",
};

export default function Register() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const { onChange } = useFormValidator(
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
        onChange={onChange}
      />
      <Input id="email" label="Email" name="email" onChange={onChange} />
      <Input
        id="password"
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        onChange={onChange}
      />
      <div className={c`self-center mt-2`}>
        <Button buttonText="Submit" buttonColor={ButtonColor.Gold} cta />
      </div>
    </form>
  );
}

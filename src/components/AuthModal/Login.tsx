import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c, getProperty } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { ErrorsOf } from "../../utils/types";
import loginSchema, { ILoginSchema } from "./login.schema";
import { ValidationError } from "yup";

const initialFormValues: ILoginSchema = {
  password: "",
  username: "",
};

const initialFormErrors: ErrorsOf<ILoginSchema> = {
  password: "",
  username: "",
};

export default function Login() {
  const [formValues, setFormValues] = useState<ILoginSchema>(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const allowSubmit = useMemo(() => {
    for (const key in formErrors) {
      if (!getProperty(formErrors, key)) continue;
      if (Boolean(formErrors[key])) {
        return false;
      }
    }
    return true;
  }, [formErrors]);

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;

    const newFormValues = { ...formValues, [name]: value };
    loginSchema
      .validateAt(name, newFormValues, { abortEarly: false })
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err: ValidationError) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });

    setFormValues(newFormValues);
  }

  return (
    <form className={c`flex flex-col`} onSubmit={onSubmit}>
      <Input
        id="username"
        label="Username"
        name="username"
        value={formValues.username}
        errorText={formErrors.username}
        onChange={onChange}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        name="password"
        value={formValues.password}
        errorText={formErrors.password}
        onChange={onChange}
      />
      <div className={c`self-center mt-2`}>
        <Button
          buttonText="Submit"
          cta
          buttonColor={ButtonColor.Gold}
          disabled={!allowSubmit}
        />
      </div>
    </form>
  );
}

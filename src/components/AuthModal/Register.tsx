import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";
import React, { useState } from "react";
import registerSchema, { IRegisterSchema } from "./register.schema";
import useFormValidator from "../../utils/useFormValidator";
import api from "../../api";
import { useAppDispatch } from "@state/index";
import { getUserInfo, setAuthModalState } from "@state/auth";
import { AxiosError } from "axios";

const initialFormValues: IRegisterSchema = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

export default function Register() {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { onChange, formErrors } = useFormValidator(formValues, setFormValues, registerSchema);

  async function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      setLoading(true);
      await api.authApi.register(formValues);
      await api.authApi.login(formValues);
      dispatch(getUserInfo());
      dispatch(setAuthModalState(false));
    } catch (err) {
      if (err instanceof AxiosError) {
        setServerError(err.response?.data?.error ?? "An unknown error has occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={c`flex flex-col`} onSubmit={onSubmit}>
      {serverError && (
        <div className={c`w-full text-center bg-red-400 mt-2 px-1`}>
          <p>{serverError}</p>
        </div>
      )}
      <Input id="username" label="Username" name="username" errorText={formErrors.username} onChange={onChange} />
      <Input id="email" label="Email" name="email" onChange={onChange} errorText={formErrors.email} />
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
        <Button buttonText="Submit" buttonColor={ButtonColor.Gold} cta loading={loading} />
      </div>
    </form>
  );
}

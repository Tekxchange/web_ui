import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c, getProperty } from "@utils";
import React, { useMemo, useState } from "react";
import loginSchema, { ILoginSchema } from "./login.schema";
import useFormValidator from "../../utils/useFormValidator";
import api from "../../api";
import { AxiosError } from "axios";
import { useAppDispatch } from "@state/index";
import { getUserInfo, setAuthModalState } from "@state/auth";

const initialFormValues: ILoginSchema = {
  password: "",
  username: "",
};

export default function Login() {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<ILoginSchema>(initialFormValues);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { formErrors, onChange } = useFormValidator(formValues, setFormValues, loginSchema);

  const allowSubmit = useMemo(() => {
    for (const key in formErrors) {
      if (!getProperty(formErrors, key)) continue;
      if (formErrors[key]) {
        return false;
      }
    }
    return true;
  }, [formErrors]);

  async function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      setLoading(true);
      await api.authApi.login({
        password: formValues.password,
        username: formValues.username,
      });
      dispatch(getUserInfo());
      dispatch(setAuthModalState(false));
    } catch (err) {
      if (!(err instanceof AxiosError)) return;
      setServerError(err.response?.data?.error || "An unknown error has occurred, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={c`flex flex-col w-full`} onSubmit={onSubmit}>
      {serverError && (
        <div className={c`w-full text-center bg-red-400 mt-2 px-1`}>
          <p>{serverError}</p>
        </div>
      )}
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
        <Button buttonText="Submit" cta buttonColor={ButtonColor.Gold} disabled={!allowSubmit} loading={loading} />
      </div>
    </form>
  );
}

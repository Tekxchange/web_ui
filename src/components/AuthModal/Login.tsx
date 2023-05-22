import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c, getProperty } from "@utils";
import React, { useMemo, useState } from "react";
import loginSchema, { ILoginSchema } from "./login.schema";
import useFormValidator from "../../utils/useFormValidator";
import api from "../../api";
import { useSetRecoilState } from "recoil";
import { authSlice } from "@atoms/auth";

const initialFormValues: ILoginSchema = {
  password: "",
  username: "",
};

export default function Login() {
  const [formValues, setFormValues] = useState<ILoginSchema>(initialFormValues);
  const setAuth = useSetRecoilState(authSlice);

  const { formErrors, onChange } = useFormValidator(
    formValues,
    setFormValues,
    loginSchema
  );

  const allowSubmit = useMemo(() => {
    for (const key in formErrors) {
      if (!getProperty(formErrors, key)) continue;
      if (Boolean(formErrors[key])) {
        return false;
      }
    }
    return true;
  }, [formErrors]);

  async function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    await api.authApi.login({
      password: formValues.password,
      username: formValues.username,
    });
    const user = await api.userApi.getSelfInfo();
    setAuth({
      authModalOpen: false,
      user: { userId: user.id, username: user.username },
    });
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

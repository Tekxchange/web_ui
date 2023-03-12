import { authSlice } from "@atoms/auth";
import Button from "@components/Button";
import Modal, { IModalProps } from "@components/Modal";
import { c } from "@utils";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ForgotPassword from "./Forgot";
import Login from "./Login";
import Register from "./Register";

export enum AuthForm {
  Login,
  Register,
  ForgotPassword,
}

interface IAuthProps extends Omit<IModalProps, "children" | "onClose"> {}

export default function AuthModal(props: IAuthProps) {
  const [authState, setAuthState] = useRecoilState(authSlice);
  const [currentAuthForm, setCurrentAuthForm] = useState<AuthForm>(
    AuthForm.Login
  );

  const { ...modalProps } = props;

  return (
    <Modal
      {...modalProps}
      onClose={() => setAuthState({ ...authState, authModalOpen: false })}
    >
      <div className={c`min-w-fit min-h-fit`}>
        <section className={c`p-4 border-b-2`}>
          <Button onClick={() => setCurrentAuthForm(AuthForm.Login)}>
            Login
          </Button>
          <Button onClick={() => setCurrentAuthForm(AuthForm.Register)}>
            Register
          </Button>
          <Button onClick={() => setCurrentAuthForm(AuthForm.ForgotPassword)}>
            Forgot Password
          </Button>
        </section>
        <section>
          <AuthFormComponent currentAuthForm={currentAuthForm} />
        </section>
      </div>
    </Modal>
  );
}

interface IAuthFormProps {
  currentAuthForm: AuthForm;
}

function AuthFormComponent(props: IAuthFormProps) {
  switch (props.currentAuthForm) {
    case AuthForm.Login: {
      return <Login />;
    }
    case AuthForm.Register: {
      return (
        <>
          <Register />
        </>
      );
    }
    case AuthForm.ForgotPassword: {
      return (
        <>
          <ForgotPassword />
        </>
      );
    }
  }
}

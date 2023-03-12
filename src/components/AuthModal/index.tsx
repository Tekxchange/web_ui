import { authSlice } from "@atoms/auth";
import styles from './authModal.module.less';
import Button, { ButtonColor } from "@components/Button";
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
      <div className={c`min-h-fit p-2`}>
        <section className={c`py-2 w-max border-b-2 ${styles.inlineButtons} overflow-x-auto`}>
          <Button
            onClick={() => setCurrentAuthForm(AuthForm.Login)}
            buttonColor={
              currentAuthForm === AuthForm.Login
                ? ButtonColor.None
                : ButtonColor.Blue
            }
            disabled={currentAuthForm === AuthForm.Login}
          >
            Login
          </Button>
          <Button
            onClick={() => setCurrentAuthForm(AuthForm.Register)}
            buttonColor={
              currentAuthForm === AuthForm.Register
                ? ButtonColor.None
                : ButtonColor.Blue
            }
            disabled={currentAuthForm === AuthForm.Register}
          >
            Register
          </Button>
          <Button
            onClick={() => setCurrentAuthForm(AuthForm.ForgotPassword)}
            buttonColor={
              currentAuthForm === AuthForm.ForgotPassword
                ? ButtonColor.None
                : ButtonColor.Blue
            }
            disabled={currentAuthForm === AuthForm.ForgotPassword}
          >
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

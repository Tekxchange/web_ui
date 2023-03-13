import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";

export default function ForgotPassword() {
  return (
    <form className={c`flex flex-col`}>
      <Input id="email" label="Email" name="email" />
      <div className={c`self-center mt-2`}>
        <Button buttonColor={ButtonColor.Gold} cta buttonText="Submit" />
      </div>
    </form>
  );
}

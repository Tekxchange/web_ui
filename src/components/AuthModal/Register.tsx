import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";

export default function Register() {
  return (
    <form className={c`flex flex-col`} onSubmit={(evt) => evt.preventDefault()}>
      <Input id="username" label="Username" />
      <Input id="email" label="Email" />
      <Input id="password" label="Password" type="password" />
      <Input id="confirmPassword" label="Confirm Password" type="password" />
      <div className={c`self-center mt-2`}>
        <Button buttonText="Submit" buttonColor={ButtonColor.Gold} cta />
      </div>
    </form>
  );
}

import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";

export default function Login() {
  return (
    <form className={c`flex flex-col`}>
      <Input id="username" label="Username" errorText="Shit" />
      <Input id="password" label="Password" type="password" />
      <Button buttonText="Submit" cta buttonColor={ButtonColor.Gold} />
    </form>
  );
}

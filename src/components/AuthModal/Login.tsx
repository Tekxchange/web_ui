import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import { c } from "@utils";

export default function Login() {
  return (
    <form className={c`flex flex-col`} onSubmit={(e) => e.preventDefault()}>
      <Input id="username" label="Username" />
      <Input id="password" label="Password" type="password" />
      <Button buttonText="Submit" cta buttonColor={ButtonColor.Gold} />
    </form>
  );
}

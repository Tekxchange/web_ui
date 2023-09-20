import DropdownMenu from "@components/DropdownMenu";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  buttonText: string;
}>;

export default function DropdownContext(props: Props) {
  return (
    <DropdownMenu buttonText={props.buttonText} ignoreContextClick>
      <section className={"w-max h-max"}>{props.children}</section>
    </DropdownMenu>
  );
}

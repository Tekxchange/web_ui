import { ReactComponent as Spinner } from "@assets/spinner.svg";
import { c } from "@utils";

type Props = {
  className?: string;
};

export default function Loading(props: Props) {
  return <Spinner className={props.className ?? c`h-24 w-24`} />;
}

import { ReactComponent as Spinner } from "@assets/spinner.svg";
import { c } from "@utils";

export default function Loading() {
  return <Spinner className={c`h-24 w-24`} />;
}

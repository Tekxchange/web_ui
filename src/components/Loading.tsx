import { ReactComponent as Spinner } from "../assets/spinner.svg";
import { classes } from "../utils";

export default function Loading() {
  return <Spinner className={classes("h-24", "w-24")} />;
}

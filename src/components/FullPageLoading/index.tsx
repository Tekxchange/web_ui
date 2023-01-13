import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import { classes } from "../../utils";

export default function FullPageLoading() {
  return (
    <div
      className={classes(
        "flex",
        "app-height",
        "w-full",
        "justify-center",
        "items-center"
      )}
    >
      <Spinner className={classes("w-24", "h-24")} />
    </div>
  );
}

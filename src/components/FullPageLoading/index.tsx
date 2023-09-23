import Spinner from "@assets/spinner.svg?react";
import AppHeight from "@components/AppHeight";
import { c } from "@utils";

export default function FullPageLoading() {
  return (
    <AppHeight>
      <Spinner className={c`w-24 h-24 dark:invert dark:contrast-200`} />
    </AppHeight>
  );
}

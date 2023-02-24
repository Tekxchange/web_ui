import { ReactComponent as Spinner } from "@assets/spinner.svg";
import { c } from "@utils";

export default function FullPageLoading() {
  return (
    <div className={c`flex app-height w-full justify-center items-center`}>
      <Spinner className={c`w-24 h-24`} />
    </div>
  );
}

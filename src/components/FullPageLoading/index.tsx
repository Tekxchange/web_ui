import { ReactComponent as Spinner } from "../../assets/spinner.svg";

export default function FullPageLoading() {
  return (
    <div className="flex app-height w-full justify-center items-center">
      <Spinner className="w-24 h-24" />
    </div>
  );
}

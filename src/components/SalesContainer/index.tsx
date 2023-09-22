import { c } from "@utils";
import { PropsWithChildren } from "react";
import styles from "./salesContainer.module.less";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function SalesContainer({ children, className }: Props) {
  return <div className={c`${className} ${styles.container}`}>{children}</div>;
}

import { c } from "@utils";
import React, { useEffect } from "react";
import styles from "./modal.module.less";

export interface IModalProps {
  children: React.ReactNode | React.ReactNode[];
  open?: boolean;
  onClose: () => void;
}

export default function Modal(props: IModalProps) {
  const { children, onClose, open } = props;

  useEffect(() => {
    if (open) document.querySelector("html")!.style.overflowY = "hidden";
    else document.querySelector("html")!.style.overflowY = "auto";
  }, [open]);

  if (!open) return <></>;

  return (
    <div
      className={c`fixed top-0 right-0 z-50 w-screen h-screen bg-black bg-opacity-50`}
      onClick={onClose}
    >
      <section
        className={c`absolute w-max bottom-1/2 right-1/2 rounded-md bg-white ${styles.enter} max-h-full`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </div>
  );
}

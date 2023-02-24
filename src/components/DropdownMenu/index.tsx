import styles from "./dropdownMenu.module.less";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

import React, { useState } from "react";
import Button from "@components/Button";
import { c } from "@utils";

interface IDropdownProps extends React.PropsWithChildren {
  buttonText: string;
}

export default function DropdownMenu(props: IDropdownProps) {
  const { buttonText, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={c`relative box-border`}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <span className={c`flex box-border`}>
          <p>{buttonText}</p>
          <ChevronDoubleDownIcon
            className={c`
              w-5
              h-5
              self-center
              ml-1
              transition-transform
              ${isOpen && "rotate-180"}
            `}
          />
        </span>
      </Button>
      <div
        className={c`
          absolute
          py-2
          transition-all
          bg-white
          rounded
          text-black
          translate-x-1/2
          right-1/2
          ${styles.dropdownMenu}
          ${isOpen ? styles.open : styles.closed}
          flex
          min-w-full
          text-lg
        `}
      >
        {children}
      </div>
    </div>
  );
}

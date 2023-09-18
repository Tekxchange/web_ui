/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./dropdownMenu.module.less";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

import React, { useRef, useState } from "react";
import Button from "@components/Button";
import { c } from "@utils";
import { useOnClickOutside } from "usehooks-ts";

interface IDropdownProps extends React.PropsWithChildren {
  buttonText: string;
}

export default function DropdownMenu(props: IDropdownProps) {
  const { buttonText, children: oldChildren } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(containerRef, () => setIsOpen(false));

  const children = React.Children.map(oldChildren, (child) => {
    if (React.isValidElement(child)) {
      const oldOnClick = child.props["onClick"];
      return React.cloneElement<any>(child, {
        onClick: (evt: any) => {
          setIsOpen(false);
          oldOnClick?.(evt);
        },
      });
    }
    return child;
  });

  return (
    <div ref={containerRef} className={c`relative box-border`}>
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
        onBlur={() => setIsOpen(false)}
        className={c`
          absolute
          py-2
          transition-all
          bg-slate-100
          dark:bg-zinc-800
          border
          rounded
          text-black
          dark:text-slate-300
          translate-x-1/2
          right-1/2
          ${styles.dropdownMenu}
          ${isOpen ? styles.open : styles.closed}
          text-sm
          max-w-none
          min-w-full
          md:text-lg
        `}
      >
        {children}
      </div>
    </div>
  );
}

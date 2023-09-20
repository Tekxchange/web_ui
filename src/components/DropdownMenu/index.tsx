/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./dropdownMenu.module.less";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

import React, { useRef, useState } from "react";
import Button from "@components/Button";
import { c } from "@utils";
import { useOnClickOutside } from "usehooks-ts";

interface IDropdownProps extends React.PropsWithChildren {
  buttonText: string;
  ignoreContextClick?: boolean;
}

export default function DropdownMenu(props: IDropdownProps) {
  const { buttonText, children: oldChildren } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(containerRef, () => setIsOpen(false));

  function onTransitionEnd(evt: React.TransitionEvent) {
    evt.preventDefault();
    if (!evt.target || evt.target !== contextRef.current || evt.propertyName !== "transform") return;

    const el = contextRef.current;

    if (!isOpen) {
      el.removeAttribute("style");
      return;
    }

    const rect = el.getBoundingClientRect();
    const clientRect = document.body.getBoundingClientRect();

    // Overflowing left side of screen
    if (rect.x < 0) {
      el.style.right = `calc(${rect.x}px + 50%)`;
      return;
    }

    // Overflowing right side of screen
    if (rect.x + rect.width > clientRect.width) {
      el.style.right = `calc(${rect.x + rect.width - clientRect.width}px + 50%)`;
      return;
    }
  }

  const children = React.Children.map(oldChildren, (child) => {
    if (React.isValidElement(child)) {
      const oldOnClick = child.props["onClick"];
      return React.cloneElement<any>(child, {
        onClick: (evt: any) => {
          if (!props.ignoreContextClick) {
            setIsOpen(false);
          }
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
            className={c`w-5 h-5 self-center ml-1 transition-transform ${isOpen && "rotate-180"}`}
          />
        </span>
      </Button>
      <div
        className={c`absolute py-2 transition-all bg-slate-100 dark:bg-zinc-800 border rounded
          text-black dark:text-slate-300 ${styles.dropdownMenu} 
          translate-x-1/2 right-1/2 text-sm max-w-none min-w-full md:text-lg z-50
          ${isOpen ? styles.open : styles.closed}`}
        onTransitionEndCapture={onTransitionEnd}
        ref={contextRef}
      >
        {children}
      </div>
    </div>
  );
}

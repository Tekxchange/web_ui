import "./dropdownMenu.less";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

import React, { useCallback, useEffect, useState } from "react";
import Button, { ButtonColor } from "../Button";

interface IDropdownProps extends React.PropsWithChildren {
  buttonText: string;
}

export default function DropdownMenu(props: IDropdownProps) {
  const { buttonText, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative box-border">
      <Button onClick={() => setIsOpen(!isOpen)}>
        <span className="flex box-border dropdown-menu-button">
          <p>{buttonText}</p>
          <ChevronDoubleDownIcon
            className={`w-5 h-5 self-center ml-1 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`.trim()}
          />
        </span>
      </Button>
      <div
        className={`
        absolute py-2 transition-all bg-white rounded
        text-black translate-x-1/2 right-1/2 dropdown-menu flex min-w-full text-lg ${
          isOpen ? "open" : "closed"
        }`.trim()}
      >
        {children}
      </div>
    </div>
  );
}

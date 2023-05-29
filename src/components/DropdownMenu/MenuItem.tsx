import React from "react";
import { c } from "@utils";
import type { Cog6ToothIcon } from "@heroicons/react/20/solid";

export enum IconPosition {
  Left,
  Right,
}

export interface IMenuItemProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "ref" | "children" | "className"
  > {
  buttonText: string;
  icon?: typeof Cog6ToothIcon;
  iconPosition?: IconPosition;
}

const MenuItem = React.forwardRef<HTMLButtonElement, IMenuItemProps>(
  (props, ref) => {
    const {
      buttonText,
      icon: Icon,
      iconPosition: propsIconPosition,
      ...buttonProps
    } = props;
    const iconPosition = propsIconPosition || IconPosition.Left;
    return (
      <button
        ref={ref}
        {...buttonProps}
        className={c`hover:bg-gray-100 min-w-full h-full px-2 py-1
          active:shadow-lg-inner active:shadow-gray-400 transition-colors w-max flex justify-between items-center`}
      >
        {iconPosition === IconPosition.Left && Icon && (
          <Icon className={c`w-5 h-5 inline mr-5`} />
        )}
        {buttonText}
        {iconPosition === IconPosition.Right && Icon && (
          <Icon className={c`w-5 h-5 inline ml-5`} />
        )}
      </button>
    );
  }
);

export default MenuItem;

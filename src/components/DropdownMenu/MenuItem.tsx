import React from "react";
import { classes } from "../../utils";

export interface IMenuItemProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "ref" | "children" | "className"
  > {
  buttonText: string;
}

const MenuItem = React.forwardRef<HTMLButtonElement, IMenuItemProps>(
  (props, ref) => {
    const { buttonText, ...buttonProps } = props;
    return (
      <button
        ref={ref}
        {...buttonProps}
        className={classes(
          "hover:bg-gray-100",
          "w-full",
          "h-full",
          "px-2",
          "py-1",
          "active:shadow-lg-inner",
          "active:shadow-gray-400"
        )}
      >
        {buttonText}
      </button>
    );
  }
);

export default MenuItem;

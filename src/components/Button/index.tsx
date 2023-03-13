import React from "react";
import { c } from "@utils";
import styles from "./button.module.less";

export enum ButtonColor {
  Red,
  Blue,
  Green,
  Gold,
  None,
}

const buttonColorMap: Record<ButtonColor, string> = {
  [ButtonColor.None]: c`
    bg-transparent
    hover:bg-gray-100
    text-blue-700
    hover:shadow-none
  `,
  [ButtonColor.Red]: c`
    bg-red-400
    hover:bg-red-300
    text-black
    hover:shadow-black
  `,
  [ButtonColor.Green]: c`
    bg-green-400
    hover:bg-green-300
    text-black
    hover:shadow-black
  `,
  [ButtonColor.Blue]: c`
    bg-blue-300
    hover:bg-blue-200
    text-black
    hover:shadow-black
  `,
  [ButtonColor.Gold]: c`
    bg-yellow-400
    hover:bg-yellow-300
    text-black
    hover:shadow-black
  `,
};

interface IButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "ref" | "className"
  > {
  buttonText?: string;
  buttonColor?: ButtonColor;
  /**
   * Call to action? (Adds extra animations on the button)
   */
  cta?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const { buttonText, buttonColor, children, cta, disabled, ...buttonProps } =
      props;

    return (
      <button
        ref={ref}
        disabled={disabled}
        {...buttonProps}
        className={c`
          ${buttonColorMap[buttonColor ?? ButtonColor.None]}
          ${cta && !disabled ? styles.cta : ""}
          py-1
          px-2
          rounded-md
          border-transparent
          hover:shadow-sm
          active:shadow-black
          transition-colors
          box-border
          border
          text-lg
          active:shadow-lg-inner
          disabled:bg-slate-300
          disabled:text-slate-100
          disabled:hover:shadow-none
          disabled:cursor-not-allowed
        `}
      >
        <>
          {buttonText}
          {children}
        </>
      </button>
    );
  }
);

export default Button;

import React from "react";
import styles from "./button.module.less";

export enum ButtonColor {
  Red,
  Blue,
  Green,
  Gold,
  None,
}

const buttonColorMap: Record<ButtonColor, string> = {
  [ButtonColor.None]:
    "bg-transparent hover:bg-gray-100 text-blue-700 hover:shadow-none",
  [ButtonColor.Red]:
    "bg-red-400 hover:bg-red-300 text-black hover:shadow-black",
  [ButtonColor.Green]:
    "bg-green-400 hover:bg-green-300 text-black hover:shadow-black",
  [ButtonColor.Blue]:
    "bg-blue-300 hover:bg-blue-200 text-black hover:shadow-black",
  [ButtonColor.Gold]:
    "bg-yellow-400 hover:bg-yellow-300 text-black hover:shadow-black",
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
    const { buttonText, buttonColor, children, cta, ...buttonProps } = props;

    return (
      <button
        ref={ref}
        {...buttonProps}
        className={`
        ${buttonColorMap[buttonColor ?? ButtonColor.None]} ${
          cta ? styles.cta : ""
        } py-1 px-2 rounded-md border-transparent hover:shadow-sm active:shadow-black transition-colors box-border border text-lg active:shadow-lg-inner
        `.trim()}
      >
        <>
          {buttonText && buttonText}
          {children}
        </>
      </button>
    );
  }
);

export default Button;

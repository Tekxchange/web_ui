import React from "react";

export enum ButtonColor {
  Red,
  Blue,
  Green,
  None,
}

const buttonColorMap: Record<ButtonColor, string> = {
  [ButtonColor.None]: "border-transparent hover:bg-gray-100 text-blue-700",
  [ButtonColor.Red]: "",
  [ButtonColor.Green]: "",
  [ButtonColor.Blue]: "",
};

interface IButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "ref" | "className"
  > {
  buttonText?: string;
  buttonColor?: ButtonColor;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const { buttonText, buttonColor, children, ...buttonProps } = props;

    return (
      <button
        ref={ref}
        {...buttonProps}
        className={`
        ${
          buttonColorMap[buttonColor ?? ButtonColor.None]
        } py-1 px-2 rounded-md transition-colors box-border border text-lg
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

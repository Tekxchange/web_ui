import React from "react";

export enum ButtonColor {
  Red,
  Blue,
  Green,
  Gold,
  None,
}

const buttonColorMap: Record<ButtonColor, string> = {
  [ButtonColor.None]: "bg-transparent hover:bg-transparent text-blue-700",
  [ButtonColor.Red]: "bg-red-400 hover:bg-red-300 text-black",
  [ButtonColor.Green]: "bg-green-400 hover:bg-green-300 text-black",
  [ButtonColor.Blue]: "bg-blue-300 hover:bg-blue-200 text-black",
  [ButtonColor.Gold]: "bg-yellow-400 hover:bg-yellow-300 text-black",
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
        } py-1 px-2 rounded-md border-transparent hover:shadow-sm hover:shadow-black active:shadow-black transition-colors box-border border text-lg active:shadow-lg-inner
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

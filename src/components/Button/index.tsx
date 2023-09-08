import React from "react";
import { c } from "@utils";
import styles from "./button.module.less";
import Loading from "@components/Loading";

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
    hover:bg-slate-100
    dark:hover:bg-slate-800
    text-blue-700
    dark:text-cyan-400
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
    dark:bg-lime-600
    hover:bg-green-300
    dark:hover:bg-lime-400
    text-black
    dark:text-slate-900
    hover:shadow-black
    dark:hover:shadow-slate-600
  `,
  [ButtonColor.Blue]: c`
    bg-blue-300
    dark:bg-cyan-700
    hover:bg-blue-200
    dark:hover:bg-cyan-500
    text-black
    dark:text-slate-200
    hover:shadow-black
    dark:hover:shadow-slate-600
  `,
  [ButtonColor.Gold]: c`
    bg-yellow-400
    dark:bg-yellow-600
    hover:bg-yellow-300
    dark:hover:bg-yellow-400
    text-black
    dark:text-slate-900
    hover:shadow-black
    dark:hover:shadow-slate-600
  `,
};

interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  buttonText?: string;
  buttonColor?: ButtonColor;
  /**
   * Call to action? (Adds extra animations on the button)
   */
  cta?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, propsRef) => {
  const { buttonText, buttonColor, children, cta, disabled: propsDisabled, className, loading, ...buttonProps } = props;
  const disabled = propsDisabled || loading;

  return (
    <button
      ref={propsRef}
      disabled={disabled}
      {...buttonProps}
      className={c`
          ${className}
          ${buttonColorMap[buttonColor ?? ButtonColor.None]}
          ${cta && !disabled ? styles.cta : ""}
          py-1
          px-2
          rounded-md
          border-transparent
          hover:shadow-sm
          active:shadow-black
          dark:active:shadow-slate-500
          transition-colors
          box-border
          border
          text-sm
          md:text-lg
          active:shadow-lg-inner
          disabled:bg-slate-300
          dark:disabled:bg-slate-500
          disabled:text-slate-100
          dark:disabled:text-slate-300
          disabled:hover:shadow-none
          disabled:cursor-not-allowed
          overflow-hidden
          max-h-full
          relative
        `}
    >
      <>
        <section className={loading ? c`opacity-0` : c`opacity-100`}>
          {buttonText}
          {children}
        </section>

        {loading && (
          <div className={c`absolute w-full h-full top-0 left-0`}>
            <Loading className={c`w-full h-full`} />
          </div>
        )}
      </>
    </button>
  );
});

Button.displayName = "Button";

export default Button;

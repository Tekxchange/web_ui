import { c, capitalize } from "@utils";
import React, { useEffect, useState } from "react";
import styles from "./input.module.less";

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref" | "className"> {
  label: string;
  id: string;
  errorText?: string;
  textArea?: boolean;
}

enum InputVariation {
  Error,
  Active,
  Inactive,
}

const variation: Record<InputVariation, string> = {
  [InputVariation.Active]: c`border-blue-400 dark:border-cyan-500`,
  [InputVariation.Inactive]: c`border-slate-300`,
  [InputVariation.Error]: c`border-red-400`,
};

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { label, id, errorText, onChange, textArea, ...inputProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [currentVariation, setCurrentVariation] = useState(InputVariation.Inactive);

  useEffect(() => {
    if (errorText) {
      setCurrentVariation(InputVariation.Error);
    }

    if (isFocused) setCurrentVariation(InputVariation.Active);

    if (!isFocused && !errorText) setCurrentVariation(InputVariation.Inactive);
  }, [isFocused, errorText]);

  return (
    <div
      className={c`relative ${textArea ? "h-40" : undefined} my-2 border-2 rounded-md px-2 py-2 ${
        variation[currentVariation]
      } transition-colors`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data-tooltip-id="tooltip"
      data-tooltip-variant="error"
      data-tooltip-content={capitalize(errorText)}
      data-tooltip-float
      data-tooltip-delay-show={0}
    >
      <label
        htmlFor={id}
        className={c`absolute ${
          isFocused || !isEmpty ? styles.focused : styles.lostFocus
        } transition-all will-change-transform pointer-events-none`}
      >
        {label}
      </label>
      {textArea ? (
        <textarea
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          id={id}
          onChange={(evt) => {
            if (!evt.currentTarget.value) setIsEmpty(true);
            else setIsEmpty(false);
            onChange?.(evt as unknown as React.ChangeEvent<HTMLInputElement>);
          }}
          className={c`w-full h-full active:outline-none focus:outline-none autofill:bg-transparent dark:bg-slate-800
        autofill:text-black dark:autofill:!text-slate-700 resize-none`}
          {...(inputProps as React.InputHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          onChange={(evt) => {
            if (!evt.currentTarget.value) setIsEmpty(true);
            else setIsEmpty(false);
            onChange?.(evt);
          }}
          className={c`w-full h-full active:outline-none focus:outline-none autofill:bg-transparent dark:bg-slate-800
          autofill:text-black dark:autofill:!text-slate-700`}
          {...inputProps}
        />
      )}
    </div>
  );
});
Input.displayName = "Input";

export default Input;

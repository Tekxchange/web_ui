import { c, capitalize } from "@utils";
import React, { useEffect, useState } from "react";
import styles from "./input.module.less";

interface IInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "ref" | "className"
  > {
  label: string;
  id: string;
  errorText?: string;
  fullWidth?: boolean;
}

enum InputVariation {
  Error,
  Active,
  Inactive,
}

const variation: Record<InputVariation, string> = {
  [InputVariation.Active]: c`border-blue-400`,
  [InputVariation.Inactive]: c``,
  [InputVariation.Error]: c`border-red-400`,
};

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { label, id, errorText, onChange, fullWidth, ...inputProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [currentVariation, setCurrentVariation] = useState(
    InputVariation.Inactive
  );

  useEffect(() => {
    if (Boolean(errorText)) {
      setCurrentVariation(InputVariation.Error);
    }

    if (isFocused) setCurrentVariation(InputVariation.Active);

    if (!isFocused && !Boolean(errorText))
      setCurrentVariation(InputVariation.Inactive);
  }, [isFocused, errorText]);

  return (
    <div
      className={c`relative my-2 border-2 rounded-md px-2 py-2 ${variation[currentVariation]} transition-colors`}
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
      <input
        ref={ref}
        id={id}
        onChange={(evt) => {
          if (!evt.currentTarget.value) setIsEmpty(true);
          else setIsEmpty(false);
          props.onChange?.(evt);
        }}
        className={c`w-full h-full active:outline-none focus:outline-none autofill:bg-transparent`}
        {...inputProps}
      />
    </div>
  );
});
Input.displayName = "Input";

export default Input;

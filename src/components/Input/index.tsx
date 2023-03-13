import { c } from "@utils";
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
  const { label, id, errorText, onChange, ...inputProps } = props;

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
      className={c`relative mt-2 mb-2 border-2 rounded-md px-2 py-2 ${variation[currentVariation]} transition-colors`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <label
        htmlFor={id}
        className={c`absolute ${
          isFocused || !isEmpty ? styles.focused : styles.lostFocus
        } cursor-text transition-transform text-slate-500`}
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
        className={c`w-full h-full active:outline-none focus:outline-none`}
        {...inputProps}
      />
    </div>
  );
});
Input.displayName = "Input";

export default Input;

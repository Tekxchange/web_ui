import { c } from "@utils";
import React, { useState } from "react";
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
  [InputVariation.Active]: c``,
  [InputVariation.Inactive]: c``,
  [InputVariation.Error]: c``,
};

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { label, id, errorText, onChange, ...inputProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <div
      className={c`relative mt-2 mb-2 border-2 rounded-md px-2 py-2`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <label
        htmlFor={id}
        className={c`absolute px-1 ${
          isFocused || !isEmpty ? styles.focused : styles.lostFocus
        } cursor-text transition-transform`}
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

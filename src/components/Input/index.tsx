import { c, capitalize } from "@utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./input.module.less";
import { useMediaQuery } from "usehooks-ts";

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref" | "className"> {
  label: string;
  id: string;
  errorText?: string;
  textArea?: boolean;
  fullWidth?: boolean;
}

enum InputVariation {
  Error,
  Active,
  Inactive,
  Success,
}

const variation: Record<InputVariation, string> = {
  [InputVariation.Active]: c`border-blue-400 dark:border-cyan-500`,
  [InputVariation.Inactive]: c`border-slate-300`,
  [InputVariation.Error]: c`border-red-400`,
  [InputVariation.Success]: c`border-green-400`,
};

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { label, id, errorText, onChange, textArea, fullWidth, ...inputProps } = props;

  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [currentVariation, setCurrentVariation] = useState(InputVariation.Inactive);

  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const empty = props.value === undefined || props.value === null || props.value === "";
    setIsEmpty(empty && props.type !== "file");
  }, []);

  useEffect(() => {
    if (!labelRef.current) return;
    let parentElement: HTMLElement | null = labelRef.current.parentElement;
    let found = false;

    while (!found) {
      if (!parentElement) return;
      const background = window.getComputedStyle(parentElement).backgroundColor;
      if (background !== "rgba(0, 0, 0, 0)") {
        found = true;
        break;
      }
      parentElement = parentElement.parentElement;
    }
    if (!parentElement) return;
    const parentColor = window.getComputedStyle(parentElement).backgroundColor;
    labelRef.current.style.setProperty("--after-background", parentColor);
  }, [isFocused]);

  const isSuccess = useMemo(() => {
    return !isEmpty && !props.errorText;
  }, [isEmpty, props.errorText]);

  useEffect(() => {
    if (errorText) {
      setCurrentVariation(InputVariation.Error);
    }

    if (isFocused) setCurrentVariation(InputVariation.Active);

    if (!isFocused && !errorText) setCurrentVariation(InputVariation.Inactive);

    if (!isFocused && !errorText && isSuccess) setCurrentVariation(InputVariation.Success);
  }, [isFocused, errorText]);

  return (
    <div
      className={c`relative ${textArea ? "h-40" : undefined} my-2 border-2 rounded-md px-2 py-2 ${
        variation[currentVariation]
      } transition-colors ${fullWidth && "w-full"}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data-tooltip-id="tooltip"
      data-tooltip-variant="error"
      data-tooltip-content={capitalize(errorText)}
      data-tooltip-float
      data-tooltip-delay-show={0}
    >
      <label ref={labelRef} htmlFor={id} className={c`absolute top-0 left-0 h-full w-full pointer-events-none px-2`}>
        <p
          className={c`relative px-2 ${isFocused || !isEmpty ? styles.focused : styles.lostFocus}
          w-fit`}
        >
          {label}
        </p>
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
          className={c`w-full h-full active:outline-none focus:outline-none autofill:bg-transparent bg-transparent
        autofill:text-black dark:autofill:!text-slate-700 resize-none`}
          {...(inputProps as React.InputHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          onChange={(evt) => {
            if (!evt.currentTarget.value && props.type !== "file") setIsEmpty(true);
            else setIsEmpty(false);
            onChange?.(evt);
          }}
          className={c`w-full h-full active:outline-none focus:outline-none autofill:bg-transparent bg-transparent
           file:hidden ${props.type === "file" && "cursor-pointer"} text-current ${isDarkMode && styles.autofillDark}`}
          {...inputProps}
        />
      )}
    </div>
  );
});
Input.displayName = "Input";

export default Input;

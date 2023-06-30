import React, { useState } from "react";
import { Schema, ValidationError } from "yup";
import { ErrorsOf } from "./types";

function valuesToErrors<TValues extends object>(
  input: TValues
): ErrorsOf<TValues> {
  const toReturn: Record<string | number | symbol, string> = {};

  Object.keys(input).forEach((key) => (toReturn[key] = ""));

  return toReturn as ErrorsOf<TValues>;
}

export default function useFormValidator<TValues extends object>(
  formValues: TValues,
  setFormValues: (newValues: TValues) => void,
  validator: Schema
) {
  const [formErrors, setFormErrors] = useState(valuesToErrors(formValues));

  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();

    const { name, value } = evt.target;
    const newFormValues = { ...formValues, [name]: value };

    validator
      .validateAt(name, newFormValues)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err: ValidationError) =>
        setFormErrors({ ...formErrors, [name]: err.message })
      );
    setFormValues(newFormValues);
  }

  return { onChange, formErrors } as const;
}

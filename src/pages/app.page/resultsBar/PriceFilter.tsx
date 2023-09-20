import Input from "@components/Input";
import Button, { ButtonColor } from "@components/Button";
import DropdownContext from "@components/DropdownContext";
import { option, Option } from "@utils/option";
import React, { useState } from "react";
import useFormValidator from "@utils/useFormValidator";
import priceFilterSchema from "./priceFilter.schema";
import { useAppSelector } from "@state/index";

type Props = {
  onSubmit: (min: Option<number>, max: Option<number>) => void;
};

type FormValues = {
  min?: number;
  max?: number;
};

export default function PriceFilter(props: Props) {
  const { priceLow, priceHigh } = useAppSelector((state) => state.search.filter);

  const [formValues, setFormValues] = useState<FormValues>({
    min: priceLow.raw,
    max: priceHigh.raw,
  });

  const { onChange, formErrors } = useFormValidator(formValues, setFormValues, priceFilterSchema);

  function submitChange(evt: React.MouseEvent) {
    evt.preventDefault();
    props.onSubmit?.(option(formValues.min), option(formValues.max));
  }

  return (
    <DropdownContext buttonText={"Price"} >
      <div className={"flex flex-col justify-center items-center"}>
        <div className={"w-80 h-full flex p-5 items-center"}>
          <Input
            label={"Minimum"}
            id={"minimumPrice"}
            type={"number"}
            name={"min"}
            min={1}
            value={formValues.min}
            errorText={formErrors.min}
            onChange={onChange}
          />
          <p className={"text-center text-3xl mx-2"}>-</p>
          <Input
            label={"Maximum"}
            id={"maximumPrice"}
            type={"number"}
            name={"max"}
            min={1}
            value={formValues.max}
            errorText={formErrors.max}
            onChange={onChange}
          />
        </div>
        <Button buttonColor={ButtonColor.Green} onClick={submitChange}>
          Apply
        </Button>
      </div>
    </DropdownContext>
  );
}

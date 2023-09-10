import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import PicturePicker from "@components/PicturePicker";
import { c } from "@utils";
import useFormValidator from "@utils/useFormValidator";
import { FormEvent, useMemo, useState } from "react";
import listProductSchema from "./listProduct.schema";

type FormValues = {
  title: string;
  price: number;
  description: string;
  pictures: File[];
};

const initialFormValues: FormValues = {
  description: "",
  price: 0,
  title: "",
  pictures: [],
};

export default function ListProduct() {
  const [loading, _setLoading] = useState(false);

  const [formValues, setFormValues] = useState(initialFormValues);

  const { formErrors, onChange } = useFormValidator(formValues, setFormValues, listProductSchema);

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  const allowSubmit = useMemo(() => {
    let validInput: boolean;
    try {
      listProductSchema.validateSync(formValues);
      validInput = true;
    } catch (err) {
      validInput = false;
    }
    return validInput || loading;
  }, [loading, formValues]);

  return (
    <section className={c`dark:bg-slate-800 w-full h-full flex flex-col items-center overflow-y-auto px-2`}>
      <form className={c`p-8 my-auto rounded-md border-slate-700 border w-full max-w-2xl`} onSubmit={onSubmit}>
        <h2 className={c`text-lg text-center`}>New Product</h2>
        <hr className={c`mb-2`} />
        <section className={c`space-y-4 w-full`}>
          <section className={c`w-full flex flex-col md:flex-row md:justify-evenly md:space-x-4`}>
            <Input
              label="Title"
              id="title"
              name="title"
              fullWidth
              onChange={onChange}
              errorText={formErrors.title}
              value={formValues.title}
            />
            <Input
              type="number"
              label="Price"
              id="price"
              name="price"
              min={0}
              fullWidth
              onChange={onChange}
              value={formValues.price}
              errorText={formErrors.price}
            />
          </section>

          <Input
            type="text"
            label="Description"
            id="description"
            name="description"
            textArea
            onChange={onChange}
            value={formValues.description}
            errorText={formErrors.description}
          />
          <PicturePicker
            onChange={(pics) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange({ target: { name: "pictures", value: pics as any } } as any);
            }}
          />
        </section>
        <div className={c`mt-2 float-right`}>
          <Button
            disabled={!allowSubmit}
            loading={loading}
            type="submit"
            buttonText="Submit"
            buttonColor={ButtonColor.Gold}
          />
        </div>
      </form>
    </section>
  );
}

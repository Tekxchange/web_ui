import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import PicturePicker from "@components/PicturePicker";
import { c } from "@utils";
import useFormValidator from "@utils/useFormValidator";
import { FormEvent, useEffect, useMemo, useState } from "react";
import listProductSchema from "./listProduct.schema";
import api from "@api";
import { getCurrentPosition, inBoundingBox } from "@utils/mapUtils";
import { toast } from "react-toastify";

type FormValues = {
  title: string;
  price: number;
  description: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  pictures: File[];
};

const initialFormValues: FormValues = {
  description: "",
  price: 0,
  title: "",
  city: "",
  country: "",
  state: "",
  zip: "",
  pictures: [],
};

export default function ListProduct() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const { formErrors, onChange } = useFormValidator(formValues, setFormValues, listProductSchema);

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setLoading(true);
    let location: Awaited<ReturnType<typeof getCurrentPosition>> | null;
    try {
      location = await getCurrentPosition();
    } catch (_) {
      location = null;
    }

    try {
      const { boundingBox, ...latLong } = await api.geolocationApi.latLongFromCityState(
        formValues.city,
        formValues.state,
        formValues.country,
        formValues.zip,
      );
      if (!location) location = latLong;
      else {
        if (!inBoundingBox(location, boundingBox)) {
          location = latLong;
        }
      }
    } catch (_) {
      // do nothing. We can try to get the location later on the backend
    }

    const { pictures: _pictures, ...toSubmit } = formValues;

    try {
      await api.productApi.createProduct({
        ...toSubmit,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });

      toast.success("New product created successfully");
      setFormValues(initialFormValues);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    document.title = "Tekxchange - New Listing";
  }, []);

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

          <section className={c`w-full flex flex-col md:flex-row md:justify-evenly md:space-x-4`}>
            <Input
              label="Country"
              id="country"
              name="country"
              fullWidth
              value={formValues.country}
              errorText={formErrors.country}
              onChange={onChange}
            />
            <Input
              label="City"
              id="city"
              name="city"
              fullWidth
              value={formValues.city}
              errorText={formErrors.city}
              onChange={onChange}
            />
          </section>

          <section className={c`w-full flex flex-col md:flex-row md:justify-evenly md:space-x-4`}>
            <Input
              label="State"
              id="state"
              name="state"
              fullWidth
              value={formValues.state}
              errorText={formErrors.state}
              onChange={onChange}
            />
            <Input
              label="Zip"
              id="zip"
              name="zip"
              fullWidth
              value={formValues.zip}
              errorText={formErrors.zip}
              onChange={onChange}
            />
          </section>

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

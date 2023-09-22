import Elevate, { Elevation } from "@components/lib/Elevate";
import { useAppDispatch, useAppSelector } from "@state/index";
import PriceFilter from "./PriceFilter";
import { Option, none, some } from "@utils/option";
import Input from "@components/Input";
import { updateSearchResults } from "@state/search";

export default function Filter() {
  const { filter } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  async function onPriceUpdated(min: Option<number>, max: Option<number>) {
    dispatch(updateSearchResults({ priceLow: min, priceHigh: max }));
  }

  return (
    <Elevate elevation={Elevation.High}>
      <div className={"flex items-center px-2 md:px-10 gap-2 md:gap-5 w-fit"}>
        <PriceFilter onSubmit={onPriceUpdated} />
        <Input
          label={"Search Text"}
          id={"searchText"}
          name={"query"}
          value={filter.query.raw}
          onChange={({ target: { value } }) => {
            let toSet: Option<string>;
            if (!value) toSet = none();
            else toSet = some(value);
            dispatch(updateSearchResults({ query: toSet }));
          }}
        />
        <Input
          type={"number"}
          label={`Search Radius (${filter.radiusUnit})`}
          id={"searchRadius"}
          name={"radius"}
          value={filter.radius}
          onChange={({ target: { valueAsNumber } }) => {
            if (isNaN(valueAsNumber)) return;
            dispatch(updateSearchResults({ radius: valueAsNumber }));
          }}
        />
      </div>
    </Elevate>
  );
}

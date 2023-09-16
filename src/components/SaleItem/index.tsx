import api from "@api";
import type { ProductReturnNoUser } from "@api/productApi";
import AsyncImage from "@components/AsyncImage";
import Button, { ButtonColor } from "@components/Button";
import { c } from "@utils";
import { NavLink } from "react-router-dom";

type Props = {
  item: ProductReturnNoUser;
  className?: string;
};

export default function SaleItem({ item, className }: Props) {
  return (
    <section className={c`rounded-md min-w-min w-80 flex flex-col justify-between max-h-96 h-96 ${className}`}>
      <div>
        <div className={c`w-full h-36 overflow-hidden rounded-t-md`}>
          <AsyncImage
            className={c`w-full h-full object-cover`}
            src={item.pictures[0] ? api.productApi.getPictureUrl(item.pictures[0]) : ""}
          />
        </div>
        <div className={c`p-2 flex flex-col w-full`}>
          <h1 className={c`font-medium border-b border-black dark:border-slate-300`}>
            {item.title} -- ${item.price}
          </h1>
          <div className={c`w-full`}>
            <p className={c`overflow-clip`}>{item.description}</p>
          </div>
        </div>
      </div>

      <div className={c`w-full flex justify-around mb-2`}>
        <NavLink to={`/account/sales/${item.id}`}>
          <Button buttonText="Edit" buttonColor={ButtonColor.Blue} />
        </NavLink>
        <Button buttonText="Delete" buttonColor={ButtonColor.Red} />
      </div>
    </section>
  );
}

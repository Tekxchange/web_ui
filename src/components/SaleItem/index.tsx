import api from "@api";
import type { ProductReturn } from "@api/productApi";
import AsyncImage from "@components/AsyncImage";
import DropdownMenu from "@components/DropdownMenu";
import type Button from "@components/Button";
import MenuItem, { IconPosition } from "@components/DropdownMenu/MenuItem";
import { c } from "@utils";
import { PencilSquareIcon, TrashIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

type BaseProps = {
  item: ProductReturn;
  className?: string;
  ownItem?: boolean;
};

type NonOwned = BaseProps & {
  ownItem: false | undefined;
};

type Owned = BaseProps & {
  ownItem: true;
  onDelete: React.ComponentProps<typeof Button>["onClick"];
};

type Props = NonOwned | Owned;

export default function SaleItem({ item, className, ...props }: Props) {
  return (
    <section className={c`rounded-md min-w-min w-80 flex flex-col justify-between max-h-96 h-96 ${className}`}>
      <div className={c`h-full overflow-hidden`}>
        <div className={c`w-full h-36 overflow-hidden rounded-t-md`}>
          <AsyncImage
            className={c`w-full h-full object-cover`}
            containerClassname={c`rounded-t-md`}
            src={item.pictures[0] ? api.productApi.getPictureUrl(item.pictures[0]) : ""}
          />
        </div>
        <div className={c`p-2 flex flex-col w-full`}>
          <h1 className={c`font-medium border-b border-black dark:border-slate-300`}>
            {item.title} -- ${item.price}
          </h1>
          <div className={c`w-full text-clip mt-4`}>
            <p className={c`overflow-hidden text-ellipsis line-clamp-5`}>{item.description}</p>
          </div>
        </div>
      </div>

      <div className={c`w-full flex justify-around mb-2`}>
        {props.ownItem && (
          <DropdownMenu buttonText="Options">
            <MenuItem buttonText="Mark as Sold" icon={CurrencyDollarIcon} iconPosition={IconPosition.Right} />
            <MenuItem
              buttonText="Edit"
              icon={PencilSquareIcon}
              iconPosition={IconPosition.Right}
              link
              href={`/account/sales/${item.id}`}
            />
            <MenuItem buttonText="Delete" icon={TrashIcon} iconPosition={IconPosition.Right} onClick={props.onDelete} />
          </DropdownMenu>
        )}
      </div>
    </section>
  );
}

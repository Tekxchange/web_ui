import type { ProductReturnNoUser } from "@api/productApi";
import { c } from "@utils";

type Props = {
  item: ProductReturnNoUser;
};

const testImage = "https://picsum.photos/300/200";

export default function SaleItem({ item }: Props) {
  return (
    <section className={c`rounded-md min-w-max w-80 shadow-md shadow-gray-400 dark:shadow-black flex flex-col max-h-96 h-96`}>
      <div className={c`w-full h-36 overflow-hidden rounded-t-md`}>
        <img className={c`w-full h-full object-cover`} src={testImage} />
      </div>
      <div className={c`p-2 flex flex-col w-full`}>
        <h1 className={c`font-medium`}>
          {item.title} -- ${item.price}
        </h1>
        <div className={c`w-full`}>
          <p>{item.description}</p>
        </div>
      </div>
    </section>
  );
}

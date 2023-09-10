import Input from "@components/Input";
import { c } from "@utils";

export default function ListProduct() {
  return (
    <section className={c`dark:bg-slate-800 w-full h-full flex flex-col items-center justify-center`}>
      <form className={c`p-8 rounded-md border-slate-700 border`}>
        <h2 className={c`text-lg text-center`}>New Product</h2>
        <hr />
        <section className={c`space-y-4`}>
          <Input label="Title" id="title" />
          <Input type="number" label="Price" id="price" min={0} />
          <Input type="text" label="Description" id="description" textArea />
        </section>
      </form>
    </section>
  );
}

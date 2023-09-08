import { c } from "@utils";
import type { Cog6ToothIcon } from "@heroicons/react/20/solid";

type Props = {
  icon?: typeof Cog6ToothIcon;
  text?: string;
  onClick?: () => void;
};

export default function SidebarItem(props: Props) {
  const { icon: Icon, text, onClick } = props;
  return (
    <button
      className={c`bg-transparent hover:bg-slate-800 dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-100 transition-all h-10 max-h-fit
        flex items-center py-2 pl-4 hover:cursor-pointer dark:text-slate-300 w-full`}
      onClick={onClick}
    >
      {Icon && <Icon className={c`w-fit h-full mr-4`} />}
      {text && <h3 className={c`text-lg`}>{text}</h3>}
    </button>
  );
}

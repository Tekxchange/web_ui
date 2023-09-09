import { c } from "@utils";
import type { Cog6ToothIcon } from "@heroicons/react/20/solid";

type Props = {
  icon?: typeof Cog6ToothIcon;
  text?: string;
  onClick?: () => void;
  expanded?: boolean;
};

export default function SidebarItem(props: Props) {
  const { icon: Icon, text, onClick, expanded } = props;
  return (
    <button
      className={c`bg-transparent hover:bg-slate-800 dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-100 transition-all h-10 max-h-fit
        flex items-center py-2 pl-4 hover:cursor-pointer dark:text-slate-300 w-full relative`}
      onClick={onClick}
    >
      <section className={c`h-full w-max flex items-center`}>
        {Icon && <Icon className={c`h-full mr-4 shrink-0`} />}
        {text && (
          <h3
            className={c`text-lg transition-width-margin w-auto ${
              expanded ? "max-w-7xl mr-4" : "max-w-0"
            } whitespace-nowrap`}
          >
            {text}
          </h3>
        )}
      </section>
    </button>
  );
}

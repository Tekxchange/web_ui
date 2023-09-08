import { c } from "@utils";
import type { Cog6ToothIcon } from "@heroicons/react/20/solid";

type Props = React.PropsWithChildren<{
  icon?: typeof Cog6ToothIcon;
}>;

export default function SidebarItem(props: Props) {
  const { children, icon: Icon } = props;
  return (
    <div
      className={c`bg-transparent hover:bg-slate-800 hover:text-white dark:hover:text-slate-100 transition-all h-10 max-h-fit
        flex items-center py-2 pl-4 hover:cursor-pointer dark:text-slate-300`}
    >
      {Icon && <Icon className={c`w-fit h-full mr-4`} />}
      {children}
    </div>
  );
}

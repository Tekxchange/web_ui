import { c } from "@utils";
import SidebarItem from "./SidebarItem";
import { CurrencyDollarIcon, InboxIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className={c`w-40 border-r-2 dark:border-slate-600 h-full flex flex-col overflow-y-auto py-2`}>
      <SidebarItem icon={CurrencyDollarIcon}>
        <h2>Sales</h2>
      </SidebarItem>
      <SidebarItem icon={InboxIcon}>
        <h2>Messenger</h2>
      </SidebarItem>
      <SidebarItem icon={Cog6ToothIcon}>
        <h2>Settings</h2>
      </SidebarItem>
    </div>
  );
}

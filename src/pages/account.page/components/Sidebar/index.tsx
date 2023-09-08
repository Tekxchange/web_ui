import { c } from "@utils";
import SidebarItem from "./SidebarItem";
import { CurrencyDollarIcon, InboxIcon, Cog6ToothIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [_expanded, _setExpanded] = useState(false);

  return (
    <div
      className={c`w-48 border-r-2 dark:border-slate-600 h-full
        flex flex-col overflow-y-auto py-2 overflow-x-hidden transition-all`}
    >
      <NavLink to={"/account/sales"}>
        <SidebarItem icon={BanknotesIcon} text="My Sales" />
      </NavLink>
      <NavLink to={"/account/purchases"}>
        <SidebarItem icon={CurrencyDollarIcon} text="My Purchases" />
      </NavLink>
      <NavLink to="/account/messenger">
        <SidebarItem icon={InboxIcon} text="Messenger" />
      </NavLink>
      <SidebarItem icon={Cog6ToothIcon} text="Settings" />
    </div>
  );
}

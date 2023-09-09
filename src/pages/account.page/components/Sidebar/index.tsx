import { c } from "@utils";
import SidebarItem from "./SidebarItem";
import { CurrencyDollarIcon, InboxIcon, Cog6ToothIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={c`w-auto border-r-2 dark:border-slate-600 h-full
        overflow-y-auto py-2 overflow-x-hidden transition-all flex flex-col`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <NavLink to={"/account/sales"}>
        <SidebarItem icon={BanknotesIcon} text="My Sales" expanded={expanded} />
      </NavLink>
      <NavLink to={"/account/purchases"}>
        <SidebarItem icon={CurrencyDollarIcon} text="My Purchases" expanded={expanded} />
      </NavLink>
      <NavLink to="/account/messenger">
        <SidebarItem icon={InboxIcon} text="Messenger" expanded={expanded} />
      </NavLink>
      <SidebarItem icon={Cog6ToothIcon} text="Settings" expanded={expanded} />
    </div>
  );
}

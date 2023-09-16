import { c } from "@utils";
import SidebarItem from "./SidebarItem";
import {
  Cog6ToothIcon,
  BanknotesIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  DocumentPlusIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={c`w-auto border-r-2 dark:border-zinc-600 h-full
        overflow-y-auto py-2 overflow-x-hidden transition-all flex flex-col shrink-0`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <NavLink to={"/account"}>
        <SidebarItem icon={UserCircleIcon} text="Account" expanded={expanded} noFocus />
      </NavLink>
      <NavLink to={"/account/sales"}>
        <SidebarItem icon={BuildingStorefrontIcon} text="Sales" expanded={expanded} noFocus />
      </NavLink>
      <NavLink to={"/account/purchases"}>
        <SidebarItem icon={BanknotesIcon} text="Purchases" expanded={expanded} noFocus />
      </NavLink>
      <NavLink to={"/account/new_listing"}>
        <SidebarItem icon={DocumentPlusIcon} text="New Listing" expanded={expanded} noFocus />
      </NavLink>
      <NavLink to="/account/messenger">
        <SidebarItem icon={ChatBubbleLeftRightIcon} text="Messenger" expanded={expanded} noFocus />
      </NavLink>
      <SidebarItem icon={Cog6ToothIcon} text="Settings" expanded={expanded} />
    </div>
  );
}

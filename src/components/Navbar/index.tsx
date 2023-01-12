import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DropdownMenu from "../DropdownMenu";
import MenuItem from "../DropdownMenu/MenuItem";
import "./navbar.less";

export default function Navbar() {
  const [atTop, setAtTop] = useState(true);

  const onScroll = useCallback((evt: Event) => {
    if (window.scrollY > 0) setAtTop(false);
    else setAtTop(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
      navbar ${
        !atTop ? "stuck " : ""
      }h-16 flex px-5 border-black border-b-gray-200 z-50 bg-[rgba(255,255,255,.75)]
      w-full transition-all justify-between md:px-40 lg:px-80 sticky top-0`.trim()}
    >
      <NavLink to="/" className="self-center text-2xl">
        <h1>Tekxchange</h1>
      </NavLink>
      <div className="self-center">
        <DropdownMenu buttonText="Account">
          <MenuItem buttonText="Login" />
        </DropdownMenu>
      </div>
    </div>
  );
}

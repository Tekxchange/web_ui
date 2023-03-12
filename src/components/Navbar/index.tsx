import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { c } from "@utils";
import DropdownMenu from "@components/DropdownMenu";
import MenuItem from "@components/DropdownMenu/MenuItem";
import styles from "./navbar.module.less";
import { useRecoilState } from "recoil";
import { authSlice } from "@atoms/auth";

export default function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [authState, setAuthState] = useRecoilState(authSlice);

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
      className={c`h-16 flex px-5 z-50 bg-[rgba(255,255,255,.75)] w-full
        transition-all justify-between md:px-40 lg:px-80 sticky top-0
        ${styles.navbar} ${!atTop && styles.stuck}`}
    >
      <NavLink to="/" className={c`self-center text-2xl`}>
        <h1>Tekxchange</h1>
      </NavLink>
      <div className={c`self-center`}>
        <DropdownMenu buttonText="Account">
          <MenuItem
            buttonText="Login"
            onClick={() => setAuthState({ ...authState, authModalOpen: true })}
          />
        </DropdownMenu>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { c } from "@utils";
import DropdownMenu from "@components/DropdownMenu";
import MenuItem, { IconPosition } from "@components/DropdownMenu/MenuItem";
import styles from "./navbar.module.less";
import { useRecoilState } from "recoil";
import { authSlice } from "@atoms/auth";
import Button, { ButtonColor } from "@components/Button";
import {
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  InboxIcon
} from "@heroicons/react/20/solid";
import api from "../../api";

export default function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [{ user }, setAuthState] = useRecoilState(authSlice);

  const onScroll = useCallback(() => {
    if (window.scrollY > 0) setAtTop(false);
    else setAtTop(true);
  }, []);

  async function logout() {
    await api.authApi.logout();
    setAuthState((state) => ({ ...state, user: null }));
  }

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
        {user ? (
          <DropdownMenu buttonText="Account">
            <MenuItem
              buttonText="Messenger"
              icon={InboxIcon}
              iconPosition={IconPosition.Right}
            />
            <MenuItem
              buttonText="Settings"
              icon={Cog6ToothIcon}
              iconPosition={IconPosition.Right}
            />
            <MenuItem
              buttonText="Logout"
              onClick={logout}
              icon={ArrowLeftOnRectangleIcon}
              iconPosition={IconPosition.Right}
            />
          </DropdownMenu>
        ) : (
          <Button
            buttonText="Login / Register"
            cta
            buttonColor={ButtonColor.Gold}
            onClick={() =>
              setAuthState((state) => ({ ...state, authModalOpen: true }))
            }
          />
        )}
      </div>
    </div>
  );
}

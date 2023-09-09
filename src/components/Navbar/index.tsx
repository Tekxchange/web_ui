import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { c } from "@utils";
import DropdownMenu from "@components/DropdownMenu";
import MenuItem, { IconPosition } from "@components/DropdownMenu/MenuItem";
import styles from "./navbar.module.less";
import Button, { ButtonColor } from "@components/Button";
import { Cog6ToothIcon, ArrowLeftOnRectangleIcon, UserCircleIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@state/index";
import { setAuthModalState, logout as stateLogout } from "@state/auth";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const [atTop, setAtTop] = useState(true);

  const onScroll = useCallback(() => {
    if (window.scrollY > 0) setAtTop(false);
    else setAtTop(true);
  }, []);

  async function logout() {
    dispatch(stateLogout());
  }

  function getHomeUrl(currentPath: string): string {
    const appPaths = ["/app", "/account"];

    if (appPaths.some((path) => currentPath.toLowerCase().includes(path.toLowerCase()))) {
      return "/app";
    }
    return "/";
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={c`h-16 flex px-5 z-50 bg-transparent w-full
        transition-all justify-between md:px-40 lg:px-80 sticky top-0
        ${styles.navbar} ${!atTop && styles.stuck}`}
    >
      <NavLink to={getHomeUrl(location.pathname)} className={c`self-center text-2xl text-black dark:text-slate-300`}>
        <h1>Tekxchange</h1>
      </NavLink>
      <div className={c`self-center`}>
        {user.isSome ? (
          <DropdownMenu buttonText="Account">
            <MenuItem
              buttonText="My Account"
              icon={UserCircleIcon}
              iconPosition={IconPosition.Right}
              link
              href="/account"
            />
            <MenuItem
              buttonText="Messenger"
              icon={ChatBubbleLeftRightIcon}
              iconPosition={IconPosition.Right}
              link
              href="/account/messenger"
            />
            <MenuItem
              buttonText="Settings"
              icon={Cog6ToothIcon}
              iconPosition={IconPosition.Right}
              link
              href="/account/settings"
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
            onClick={() => dispatch(setAuthModalState(true))}
          />
        )}
      </div>
    </div>
  );
}

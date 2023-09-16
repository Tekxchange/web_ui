import Button from "@components/Button";
import { c } from "@utils";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className={c`h-8 md:h-16 w-full flex items-center justify-between border-t border-gray-100
        dark:border-zinc-600 px-5 lg:px-80 md:px-40 transition-all text-black dark:text-slate-300`}
    >
      <p className={c`text-sm md:text-lg`}>&copy; 2022-{new Date().getFullYear()} texchange.net</p>
      <NavLink to={"/privacy"} target="_blank">
        <Button tabIndex={-1}>Privacy Policy</Button>
      </NavLink>
    </footer>
  );
}

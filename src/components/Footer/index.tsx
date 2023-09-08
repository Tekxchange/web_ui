import Button from "@components/Button";
import { c } from "@utils";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className={c`h-8 md:h-16 w-full flex items-center border-t border-gray-100 dark:border-slate-600 shadow-sm
        shadow-black px-5 lg:px-80 md:px-40 transition-all text-black dark:text-slate-300`}
    >
      <p className={c`text-sm md:text-lg`}>&copy; 2022-{new Date().getFullYear()} texchange.net</p>
      <NavLink to={"/privacy"} target="_blank">
        <Button>Privacy Policy</Button>
      </NavLink>
    </footer>
  );
}

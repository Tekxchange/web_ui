import { c } from "@utils";

export default function Footer() {
  return (
    <footer
      className={c`h-8 md:h-16 w-full flex items-center border-t border-gray-100 shadow-sm
        shadow-black px-5 lg:px-80 md:px-40 transition-all`}
    >
      <p
        className={c`text-sm md:text-lg`}
        data-tooltip-id="tooltip"
        data-tooltip-content="Copyright"
      >
        &copy; 2022-{new Date().getFullYear()} texchange.net
      </p>
    </footer>
  );
}

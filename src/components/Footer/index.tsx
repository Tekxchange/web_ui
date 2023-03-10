import { c } from "@utils";

export default function Footer() {
  return (
    <footer
      className={c`h-16 w-full flex items-center border-t border-gray-100 shadow-sm
        shadow-black px-20`}
    >
      <p className={c`text-lg`}>
        &copy; 2022-{new Date().getFullYear()} texchange.net
      </p>
    </footer>
  );
}

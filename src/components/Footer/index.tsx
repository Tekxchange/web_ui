import { classes } from "@utils";

export default function Footer() {
  return (
    <footer
      className={classes(
        "h-16",
        "w-full",
        "flex",
        "items-center",
        "border-t",
        "border-gray-100",
        "shadow-sm",
        "shadow-black",
        "px-20"
      )}
    >
      <p className={classes("text-lg")}>&copy;2023 texchange.net</p>
    </footer>
  );
}

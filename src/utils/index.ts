/**
 * Easily clean up the CSS className field with this helper function
 * @param strings A list of classes to apply
 * @returns A single string joined with a space and all empty classes removed
 */
function classes(...strings: (HTMLElement["className"] | undefined | null | false)[]) {
  return strings
    .map((c) => (c || "").trim().replaceAll(",", ""))
    .filter((c) => Boolean(c))
    .join(" ");
}

/**
 * Helper function to reduce Tailwind clutter
 * @example c`test test2 test3 test4 ${styles.style} ${state && "style-here"}`
 * @returns The full className split by spaces
 */
export function c(args: TemplateStringsArray, ...params: (string | undefined | null | false)[]): string {
  const classArray: string[] = [];
  args.forEach((arg) => {
    arg.split(/,|\s/).forEach((arg) => classArray.push(arg));
  });
  params.forEach((arg) => arg && classArray.push(arg));
  return classes(...classArray);
}

export function getProperty<T extends object>(obj: T, key: string | number | symbol): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function capitalize(item?: string): string | undefined {
  if (!item) return;

  const first = item.charAt(0);
  return `${first.toLocaleUpperCase()}${item.substring(1)}`;
}

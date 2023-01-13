/**
 * Easily clean up the CSS className field with this helper function
 * @param strings A list of classes to apply
 * @returns A single string joined with a space and all empty classes removed
 */
export function classes(...strings: string[]) {
  return strings
    .map((c) => c.trim())
    .filter((c) => Boolean(c))
    .join(" ");
}

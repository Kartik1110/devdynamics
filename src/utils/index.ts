/**
 * Calculates the median value of an array of numbers.
 * @param values - The array of numbers.
 * @returns The median value.
 */
export function median(values: number[]) {
  values.sort((a, b) => a - b);
  const lowMiddle = Math.floor((values.length - 1) / 2);
  const highMiddle = Math.ceil((values.length - 1) / 2);
  return (values[lowMiddle] + values[highMiddle]) / 2;
}

/**
 * Formats a name by capitalizing the first letter of each word and removing any email domain or file extension.
 * @param name - The name to be formatted.
 * @returns The formatted name.
 */
export function getFormattedName(name: string) {
  return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").split("@devdynamics.ai")[0].split(".")[0];
}
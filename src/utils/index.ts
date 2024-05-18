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

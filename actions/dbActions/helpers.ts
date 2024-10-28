//create a generic function that takes array of T checks if it has any values and returns the first other wise null

export function getFirst<T>(val: T[]): T | null {
  if (val.length === 0) {
    return null;
  }
  return val[0];
}

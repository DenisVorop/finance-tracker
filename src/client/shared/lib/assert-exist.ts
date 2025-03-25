export function assertExist<T>(value: T | undefined | null, errorMessage = 'Value is not exist'): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(errorMessage);
  }
}

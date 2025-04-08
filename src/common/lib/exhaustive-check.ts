/** Хелпер для того, чтобы TS проверил, что все возможные значения в switch-блоке охвачены */
export function exhaustiveCheck(_value: never): never {
  throw new Error(`Unknown value: ${_value}`);
}

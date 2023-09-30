export const objMap = <T extends object> (obj: T, fn: <T>(value: any, key: any, i: number, keys: any[]) => T | void) => {
  const keys = Object.keys(obj)
  return keys.map((key, i) => {
    const value = (obj as any)[key]
    return fn(value, key, i, keys)
  })
}

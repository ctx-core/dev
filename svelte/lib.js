export function set__svelte(C, ...rest) {
  if (!C._fragment) return C
  return C.set(...rest)
}
export const set = set__svelte
export function set__svelte(C, ...rest) {
  return C._destroyed ? C : C.set(...rest)
}
export const set = set__svelte
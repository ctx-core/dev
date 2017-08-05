export function set__svelte(C, ...rest) {
  return C._fragment ? C.set(...rest) : C
}
export const set = set__svelte
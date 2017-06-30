export function on__$off(obj, name__event, fn) {
  obj.on(name__event, fn)
  return () => {
    obj.off(name__event, fn)
  }
}
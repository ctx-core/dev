export function $is__visible(el) {
  const {top, bottom} = el.getBoundingClientRect()
      , {innerHeight} = window
  return $_is__visible(top, bottom, innerHeight)
}
export function $_is__visible(top, bottom, innerHeight) {
  return  (top > 0 && top < innerHeight)
          || $_is__active(top, bottom)
}
export function $is__active(el) {
  const {top, bottom} = el.getBoundingClientRect()
  return $_is__active(top, bottom)
}
export function $_is__active(top, bottom) {
  return top <= 0 && bottom >= 0
}
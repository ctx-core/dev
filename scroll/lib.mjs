export function $is__visible(el) {
  const {top, bottom} = el.getBoundingClientRect()
      , {innerHeight} = window
  return $is__visible__(top, bottom, innerHeight)
}
export function $is__visible__(top, bottom, innerHeight) {
  return  (top > 0 && top < innerHeight)
          || $is__active__(top, bottom)
}
export function $is__active(el) {
  const {top, bottom} = el.getBoundingClientRect()
  return $is__active__(top, bottom)
}
export function $is__active__(top, bottom) {
  return top <= 0 && bottom >= 0
}
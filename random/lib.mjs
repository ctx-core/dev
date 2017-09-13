export function $float__random__uniform(min=0.0, max=1.0) {
  return $float__random__distribution(min, max, $random__uniform)
}
export function $float__random__normal(min=0.0, max=1.0) {
  return $float__random__distribution(min, max, $random__normal)
}
export function $float__random__distribution(min=0.0, max=1.0, $distribution) {
  return $distribution() * (max - min) + min
}
export function $int__random__uniform(min=0, max=1) {
  return $int__random__distribution(min, max, $random__uniform)
}
export function $int__random__normal(min=0, max=1) {
  return $int__random__distribution(min, max, $random__normal)
}
export function $int__random__distribution(min=0, max=1, $distribution) {
  return Math.floor(min + $distribution() * (max - min))
}
export function $random__uniform() {
  return Math.random()
}
export function $random__normal() {
  let u1
    , u2
    , picked = -1
  // We reject values outside of the interval [0, 1]
  // TODO: check if it is ok to do that?
  while (picked < 0 || picked > 1) {
    u1 = Math.random()
    u2 = Math.random()
    picked = 1/6 * Math.pow(-2 * Math.log(u1), 0.5) * Math.cos(2 * Math.PI * u2) + 0.5
  }
  return picked
}
function _randomInt(min, max) {
  return Math.floor(min + distribution() * (max - min))
}
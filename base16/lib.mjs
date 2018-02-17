export function random__base16(length=5) {
  const array__value = []
      , possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , length__possible = possible.length
  for (let i=0; i < length; i++) {
    array__value.push(
      possible.charAt(
        Math.floor(Math.random() * length__possible))
    )
  }
  return array__value.join('')
}
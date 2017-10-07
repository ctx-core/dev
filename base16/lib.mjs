export function random__base16(length=5) {
  const out = []
      , possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , length__possible = possible.length
  for (let i=0; i < length; i++) {
    out.push(
      possible.charAt(
        Math.floor(Math.random() * length__possible))
    )
  }
  return out.join('')
}
export function $js__components(names__components) {
  const components = []
  for (let i=0; i < names__components.length; i++) {
    const name__component = names__components[i]
    components.push(`'${name__component}'`)
  }
  return `[${components.join(',')}]`
}
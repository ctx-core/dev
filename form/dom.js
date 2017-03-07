export function value__radio(name) {
  const elements = document.getElementsByName(name)
  for (let i=0, l=elements.length; i < l; i++) {
    if (elements[i].checked) {
      return elements[i].value
    }
  }
}
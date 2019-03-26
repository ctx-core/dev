export function assert__keys(obj, _fail = (value, key) => !value && `${key} is not present`) {
  const failures = {}
  let has_failure
  for (let key in obj) {
    const fail = _fail(obj[key], key)
    if (fail) {
      has_failure = true
      failures[key] = fail
    }
  }
  return has_failure && failures
}
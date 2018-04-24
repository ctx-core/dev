const resolve = require('resolve')
    , fs = require('fs')
module.exports = {
  _version,
  _version__node,
  verify__version__node,
  _json__package
}
function _version(path) {
  return _json__package(path).version
}
function verify__version__node() {
  const version__node__expected = _version__node()
      , version__node__actual = process.versions['node']
  if (
    version__node__expected
    && version__node__expected !== version__node__actual
  ) {
    throw `Expected to be running node version ${version__node__expected}. Running ${version__node__actual}.`
  }
}
function _version__node() {
  const json__package = _json__package()
      , {engines} = json__package
      , version__node = engines && engines.node
  return version__node
}
function _json__package(path) {
  let json
  if (path) {
    const resolve__path = resolve.sync(path, { basedir: __dirname })
        , search = `/${path}/`
        , index__directory =
            resolve__path.lastIndexOf(search) + search.length
        , directory = resolve__path.slice(0, index__directory)
    json = fs.readFileSync(`${directory}/package.json`)
  } else {
    json = fs.readFileSync(`./package.json`)
  }
  return JSON.parse(json)
}
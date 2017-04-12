const resolve = require('resolve')
    , fs = require('fs')
module.exports = {
  $version,
  $version__node,
  verify__version__node,
  $package__json
}
function $version(path) {
  return $package__json(path).version
}
function verify__version__node() {
  const version__node__expected = $version__node()
      , version__node__actual = process.versions['node']
  if (
    version__node__expected
    && version__node__expected !== version__node__actual
  ) {
    throw `Expected to be running node version ${version__node__expected}. Running ${version__node__actual}.`
  }
}
function $version__node() {
  const package__json = $package__json()
      , {engines} = package__json
      , version__node = engines && engines.node
  return version__node
}
function $package__json(path) {
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
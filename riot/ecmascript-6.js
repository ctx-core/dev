const parsers__riot = require('riot-compiler/lib/parsers')
    , {js} = parsers__riot
    , {buble} = js
js['buble'] = js['ecmascript-6'] = _loadParser
function _loadParser(p1, p2, p3, p4) {
  return buble(p1, Object.assign({transforms: {modules: false}}, p2), p3, p4)
}
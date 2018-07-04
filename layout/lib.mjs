import {assign, clone__deep} from 'ctx-core/object/lib.mjs'
export function ensure__ctx__load__(ctx__html) {
	assign(ctx__html, { ctx__load__: _ctx__load__(ctx__html) })
	return ctx__html
}
export function _ctx__load__(ctx__html) {
  return ctx__html.ctx__load || clone__deep(ctx__html)
}
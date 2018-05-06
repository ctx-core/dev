import {assign, clone__deep} from 'ctx-core/object/lib.mjs'
export function ensure__ctx__load(ctx) {
  if (!ctx.ctx__load) assign(ctx, {ctx__load: clone__deep(ctx)})
	console.debug('ensure__ctx__load|debug|1')
	console.debug(ctx.ctx__load)
	return ctx
}

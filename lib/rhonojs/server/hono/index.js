import { ns_id_be_memo_pair_, ns_id_be_sig_triple_, nullish__none_ } from 'ctx-core/rmemo'
export const [
	hono_context$_,
	hono_context_,
	hono_context__set,
] = ns_id_be_sig_triple_(
	'request',
	'hono_context',
	()=>undefined)
export const [
	request$_,
	request_,
] = ns_id_be_memo_pair_(
	'request',
	'request',
	ctx=>
		hono_context_(ctx)?.req?.raw)
export const [
	request_url$_,
	request_url_,
] = ns_id_be_memo_pair_(
	'request',
	'request_url',
	ctx=>
		nullish__none_([request_(ctx)],
			request=>new URL(request.url)))

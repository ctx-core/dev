import {assign} from 'ctx-core/object/lib.mjs'
import {
	fetch__get__users,
	fetch__get__accounts,
	fetch__get__brokerages,
	fetch__get__portfolio__history,
	fetch__get__portfolios,
	fetch__get__positions
} from 'ctx-core/quovo/fetch.mjs'
import {
	assign__table__name__rpc,
	run__rpc,
	ensure__public_keys} from 'ctx-core/rpc/lib.mjs'
import {_rpc} from 'ctx-core/quovo/rpc.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo-demo/rpc.mjs'
assign__table__name__rpc({
	rpc__export__quovo__data: export__quovo__data
})
export function export__quovo__data(
	ctx={},
	...array__ctx__rest
) {
	const key = 'export__quovo__data'
	log(`${logPrefix}|${key}`)
	return run__rpc(...arguments, {
		key,
		whitelist:
			[ 'access_token__quovo',
				'user_id__quovo',
				'accounts__quovo',
				'brokerages__quovo',
				'array__ctx__portfolio__quovo',
				'positions__quovo',
				'users__quovo'],
		required: [],
		rpc: _rpc(ctx, rpc)
	})
	async function rpc() {
		log(`${logPrefix}|${key}|rpc`)
		// map
		const array__ctx__requests =
						await Promise.all([
							fetch__get__accounts(ctx),
							fetch__get__brokerages(ctx),
							assign__array__ctx__portfolio__quovo(ctx),
							fetch__get__positions(ctx),
							fetch__get__users(ctx)
						])
				, { access_token__quovo
					, user_id__quovo
					, accounts__quovo
					, brokerages__quovo
					, array__ctx__portfolio__quovo
					, positions__quovo
					, users__quovo
					} = ctx
		// reduce
		assign(ctx, ...array__ctx__requests)
		return ensure__public_keys(ctx, {
			access_token__quovo,
			user_id__quovo,
			accounts__quovo,
			brokerages__quovo,
			array__ctx__portfolio__quovo,
			positions__quovo,
			users__quovo
		})
	}
}
async function assign__array__ctx__portfolio__quovo(ctx) {
	log(`${logPrefix}|array__ctx__portfolio__quovo`)
	await fetch__get__portfolios(ctx)
	const { user_id__quovo
				, account_id__quovo
				, portfolios__quovo
				} = ctx
				// parallel
			, ctx__portfolio_history =
					await Promise.all(
						portfolios__quovo.map(portfolio__quovo => {
							const portfolio_id__quovo =
											portfolio__quovo.id
							return fetch__get__portfolio__history({
								user_id__quovo,
								account_id__quovo,
								portfolio__quovo,
								portfolio_id__quovo
							})
						}))
			, array__ctx__portfolio__quovo =
					ctx__portfolio_history
						.map(
							ctx__portfolio__quovo => {
								const { portfolio__quovo
											, portfolio_id__quovo
											, portfolio_history__quovo
											} = ctx__portfolio__quovo
								return {
									portfolio__quovo,
									portfolio_id__quovo,
									portfolio_history__quovo
								}
							})
	return ensure__public_keys(ctx, {
		array__ctx__portfolio__quovo
	})
}
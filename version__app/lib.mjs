export function _version(ctx) {
	return (
		( ctx
			&& (ctx.CACHE_VERSION
					|| ctx.VERSION))
		|| Math.random()
	)
}
export const $version = _version
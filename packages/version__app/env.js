export const RELEASE_VERSION =
	process.env.RELEASE_VERSION
	|| process.env.RELEASE_VERSION
export const SOURCE_VERSION = process.env.SOURCE_VERSION
export const CACHE_VERSION =
	process.env.CACHE_VERSION
	|| (RELEASE_VERSION && RELEASE_VERSION.replace('v', ''))
	|| SOURCE_VERSION
	|| Math.random().toString()

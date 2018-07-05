export function path__user__quovo(ctx, user__quovo) {
	const user_id__quovo =
		user__quovo
		? user__quovo.id
		: ctx.user_id__quovo
	return (
		user_id__quovo
		&& `quovo/users/${user_id__quovo}`
	) || ''
}
export function path__sync__user__quovo() {
	const path__user__quovo__ = path__user__quovo(...arguments)
	return (
		path__user__quovo__
		&& `${path__user__quovo__}/sync`
	) || ''
}
export function path__account__user__quovo(ctx, quovo__account) {
	const account_id__quovo =
		quovo__account
		? quovo__account.id
		: ctx.account_id__quovo
	return (
		account_id__quovo
		&& `${path__user__quovo(ctx)}/accounts/${account_id__quovo}`
	) || ''
}
export function path__portfolio__account__user__quovo(ctx, portfolio__quovo) {
	const portfolio_id__quovo =
		portfolio__quovo
		? portfolio__quovo.id
		: ctx.portfolio_id__quovo
	return (
		portfolio_id__quovo
		&& `${path__account__user__quovo(ctx)}/portfolios/${portfolio_id__quovo}`
	) || ''
}
export function path__portfolio_history__account__user__quovo() {
	const path__portfolio__account__user__quovo__ =
		path__portfolio__account__user__quovo(...arguments)
	return (
		path__portfolio__account__user__quovo__
		&& `${path__portfolio__account__user__quovo__}/history`
	) || ''
}
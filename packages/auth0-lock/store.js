import { _mixin__store } from '@ctx-core/store/lib.js'
import { mixin } from '@ctx-core/object/lib.js'
export const __store__Auth0Lock = _mixin__store('__store__Auth0Lock', async store => {
	const scope = [
		'Auth0Lock',
		'logout__Auth0Lock',
		'AUTH0_CLIENT_ID',
		'AUTH0_DOMAIN',
	]
	mixin(store, {
		get Auth0Lock() {return this.get().Auth0Lock},
		get logout__Auth0Lock() {return this.get().logout__Auth0Lock},
		get AUTH0_CLIENT_ID() {return this.get().AUTH0_CLIENT_ID},
		get AUTH0_DOMAIN() {return this.get().AUTH0_DOMAIN},
	})
})

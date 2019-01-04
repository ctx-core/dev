import { _mixin__store } from '@ctx-core/store/lib.js'
import { mixin, assign } from '@ctx-core/object/lib.js'
import { _no__dom } from '@ctx-core/dom/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/font/store.js'
export const __store__px__rem = _mixin__store('__store__px__rem', async store => {
	mixin(store, {
		reset__px__rem() {
			log(`${logPrefix}|assign__px__rem`)
			if (_no__dom()) return this
			const div = document.createElement('div')
			div.innerHTML = '&nbsp;'
			assign(div.style, {
				display: 'block',
				visibility: 'none',
				fontSize: '1em',
				margin: 0,
				padding: 0,
				height: 'auto',
				lineHeight: 1,
				border: 0
			})
			let px__rem
			try {
				document.body.appendChild(div)
				px__rem = div.offsetHeight
			} finally {
				div.remove()
			}
			this.set({ px__rem })
			return this
		}
	})
	return store.reset__px__rem()
})
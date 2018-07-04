import {_mixin__store} from 'ctx-core/store/lib.mjs'
import {mixin, assign} from 'ctx-core/object/lib.mjs'
import {no__dom} from 'ctx-core/dom/lib.mjs'
import {log, debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/font/store.mjs'
export const __store__px__rem = _mixin__store('__store__px__rem', store => {
	mixin(store, {
		reset__px__rem() {
			log(`${logPrefix}|assign__px__rem`)
			if (no__dom()) return this
			const div = document.createElement('div')
			div.innerHTML = '&nbsp;'
			assign(div.style, {
				display: 'block',
				visibility: 'none',
				fontSize: '1em',
				margin: 0,
				padding:0,
				height: 'auto',
				lineHeight: 1,
				border:0
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
	store.reset__px__rem()
})
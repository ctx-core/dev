import { _has__dom } from '@ctx-core/dom'
import { push__dataLayer } from './lib'
export { push__dataLayer }
export function init__dataLayer() {
	if (_has__dom()) {
		window['dataLayer'] = []
		window['dataLayer'] = window['dataLayer'] || []
		window['dataLayer'].push({
			'gtm.start': new Date().getTime(),
			event: 'gtm.js'
		})
		const f = document.getElementsByTagName('script')[0]
		const j = document.createElement('script')
		const dl = 'dataLayer' != 'dataLayer' ? '&l=' + 'dataLayer' : ''
		j.async = true
		j.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.GTM_ID}${dl}`
		f.parentNode.insertBefore(j, f)
	}
}

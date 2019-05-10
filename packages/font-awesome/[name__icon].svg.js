import Icon from './Icon.html'
export function _get(fn) {
	return async function get(req, res) {
		res.setHeader('Content-Type', 'image/svg+xml')
		const { name__icon } = req.params
		const { style } = req.query
		if (fn) await fn(req, res)
		const { html: svg } = Icon.render({
			name: name__icon,
			style,
		})
		const xml = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
${svg}
		`.trim()
		res.end(svg)
	}
}
export const get = _get()

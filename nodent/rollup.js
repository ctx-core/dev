const nodent = require('nodent')()
const createFilter = require('rollup-pluginutils').createFilter
module.exports = nodent__rollup
function nodent__rollup(options) {
	options = options || {}
	const filter = createFilter(options.include, options.exclude)
	return {
		name: 'nodent-rollup',
		transform: function (code, id) {
			if (filter(id)) {
				const result =
					nodent.compile(code, id, {
						sourcemap: true,
						promises: true,
						noRuntime: true
					})
				return {
					code: result.code
				}
			}
		}
	}
}
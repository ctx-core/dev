import sass from 'node-sass'
import importer__package from 'node-sass-package-importer'
import postcss from 'postcss'
import { each, map } from '@ctx-core/array'
export function style__sass({ content, attributes }) {
	const { type } = attributes
	if (type !== 'text/scss' && type !== 'text/sass') return
	return new Promise((fulfil, reject) => {
		sass.render({
			data: content,
			includePaths: ['src'],
			importer: importer__package(),
			sourceMap: true,
			outFile: 'x' // this is necessary, but is ignored
		}, (err, result) => {
			if (err) return reject(err)
			let ast
			try {
				let code = result.css.toString()
				if (attributes.global) {
					ast = globalize(postcss.parse(code))
					code = ast.toResult().css
				}
				fulfil({
					code,
					map: result.map.toString()
				})
			} catch (e) {
				console.error('ERROR with content:')
				if (ast) {
					console.error(css.stringify(ast))
				} else {
					console.error(content)
				}
				reject(e)
			}
		})
	})
}
export const style = style__sass
function globalize(ast) {
	const { selector } = ast
	if (selector) {
		ast.selector = `:global(${selector.replace(/:global\((.*)\)/g, '$1')})`
	}
	each(ast.nodes, globalize)
	return ast
}
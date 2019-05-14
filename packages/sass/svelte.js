import sass from 'node-sass'
import autoprefixer from 'autoprefixer'
import importer__package from 'node-sass-package-importer'
import postcss from 'postcss'
import { each, map } from '@ctx-core/array'
export function style__sass(opts) {
	const { filename, content, attributes } = opts
	const { type } = attributes
	if (type !== 'text/scss' && type !== 'text/sass') return
	return new Promise((fulfil, reject) => {
		sass.render({
			data: content,
			includePaths: ['src'],
			importer: importer__package(),
			sourceMap: true,
			outFile: 'x' // this is necessary, but is ignored
		}, async (err, result) => {
			if (err) return reject(err)
			const css = result.css.toString()
			let ast = postcss.parse(css)
			if (attributes.global) ast = globalize(ast)
			const code =
				await postcss([autoprefixer]).process(ast.toResult().css, {
					from: filename,
				})
			fulfil({
				code,
				map: result.map.toString()
			})
		})
	})
}
export const style = style__sass
export function globalize(ast) {
	const { selector } = ast
	if (selector) {
		ast.selector = `:global(${selector.replace(/:global\((.*)\)/g, '$1')})`
	}
	each(ast.nodes, globalize)
	return ast
}
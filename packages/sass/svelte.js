import sass from 'node-sass'
import importer__package from 'node-sass-package-importer'
import css from 'css'
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
			let code = result.css.toString()
			if (attributes.global) {
				const ast = css.parse(code)
				const { rules } = ast.stylesheet
				each(rules, rule => {
					const { selectors } = rule
					rule.selectors = map(selectors, selector =>
						`:global(${selector.replace(/:global\((.*)\)/g, '$1')})`
					)
				})
				code = css.stringify(ast)
			}
			fulfil({
				code,
				map: result.map.toString()
			})
		})
	})
}
export const style = style__sass

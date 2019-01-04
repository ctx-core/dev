import sass from 'node-sass'
import importer__package from 'node-sass-package-importer'
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
			fulfil({
				code: result.css.toString(),
				map: result.map.toString()
			})
		})
	})
}
export const style = style__sass

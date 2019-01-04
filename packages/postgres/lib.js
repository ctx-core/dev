import { map } from '@ctx-core/array/lib.js'
export function _ARR__name_param__pg(ARR__param) {
	return (
		map(
			ARR__param,
			(_, i) => `${i+1}`
		)
	)
}
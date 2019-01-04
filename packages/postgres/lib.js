import { map } from '@ctx-core/array/lib.js'
export function _ARR__name_param(ARR__param) {
	return (
		map(
			ARR__param,
			(_, i) => `$${i+1}`
		)
	)
}
export const _ARR__name_param__pg = _ARR__name_param
export function _sql__set__ARR__param(ARR__param, ARR__name_param) {
  return (
  	map(
  		ARR__param,
			(param, i) => `${param}=${ARR__name_param[i]}`
		).join(', ')
	)
}
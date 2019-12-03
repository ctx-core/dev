import { _sum__numerator__or__0 } from '@ctx-core/math'
export function normalize(matrix, length__columns = 2) {
	const matrix__normalized = []
	for (let i = 0; i < matrix.length; i += length__columns) {
		let sum = 0.0
		for (let j = 0; j < length__columns; j++) {
			sum += (matrix[i + j] || 0)
		}
		for (let j = 0; j < length__columns; j++) {
			const normalized =
				sum
				? matrix[i + j] / sum
				: 0
			matrix__normalized.push(normalized)
		}
	}
	return matrix__normalized
}
export const normalize__row__major__matrix = normalize
export function dot(...matrices) {
	return _sum__numerator__or__0(dotMultiply(...matrices))
}
export function dotMultiply(...matrices) {
	const length = length__validate(matrices)
	const products = []
	for (let j = 0; j < length; j++) {
		let product = matrices[0][j]
		for (let i = 1; i < matrices.length; i++) {
			product *= matrices[i][j]
		}
		products.push(product)
	}
	return products
}
export function length__validate(arrays) {
	const length = arrays[0].length
	for (let i = 1; i < arrays.length; i++) {
		if (length != arrays[i].length) {
			throw 'array lengths are not equal'
		}
	}
	return length
}
export function multiply__scalar__matrix(scalar, matrix) {
	const products = []
	for (let i = 0; i < matrix.length; i++) {
		products.push(matrix[i] * scalar)
	}
	return products
}
export function _matrix__nansum__columns(matrix, length__columns) {
	const matrix__nansum__columns = []
	for (let j = 0; j < length__columns; j++) {
		let sum__column = 0.0
		for (let i = j; i < matrix.length; i += length__columns) {
			sum__column += (matrix[i] || 0)
		}
		matrix__nansum__columns.push(sum__column)
	}
	return matrix__nansum__columns
}
export function _unit__matrix(length:number) {
	const unit__matrix = []
	for (let i = 0; i < length; i++) {
		unit__matrix.push(1)
	}
	return unit__matrix
}

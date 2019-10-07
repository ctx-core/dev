import { GraphQLError } from 'graphql'
import { andand } from '@ctx-core/function'
import { assign } from '@ctx-core/object'
import { reduce } from '@ctx-core/array'
export type Resolvers = any
export type DocumentNode = any
export type TypeDefs = string|string[]|DocumentNode|DocumentNode[]
export type GraphQLSchema = any
export interface has_state {
	state:any
}
export class ValidationError extends GraphQLError implements has_state {
	constructor(errors) {
		super('The request is invalid.')
		this.state = errors.reduce((result, error)=>{
			if (Object.prototype.hasOwnProperty.call(result, error.key)) {
				result[error.key].push(error.message)
			} else {
				result[error.key] = [error.message]
			}
			return result
		}, {})
	}
	state:any
}
export function _validation_errors__graphql(payload) {
	const errors = andand(payload, 'errors') || []
	const validation_errors =
		reduce(
			errors,
			(memo, error)=>
				assign(
					memo,
					andand(error, 'extensions', 'exception', 'state')
				),
			{})
	return validation_errors
}
export function gql(a1:TemplateStringsArray):String {
	const gql_str:String = a1[0]
	return gql_str
}

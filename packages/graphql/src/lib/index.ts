import { GraphQLError } from 'graphql'
export type Resolvers = any
export type DocumentNode = any
export type TypeDefs = string | string[] | DocumentNode | DocumentNode[]
export type GraphQLSchema = any
export interface has_state {
	state: any
}
export class ValidationError extends GraphQLError implements has_state {
	constructor(errors) {
		super('The request is invalid.')
		this.state = errors.reduce((result, error) => {
			if (Object.prototype.hasOwnProperty.call(result, error.key)) {
				result[error.key].push(error.message)
			} else {
				result[error.key] = [error.message]
			}
			return result
		}, {})
	}
	state: any
}

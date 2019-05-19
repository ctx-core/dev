import { _spread } from '@ctx-core/array'
import { buildSchema } from 'graphql'
export const gql = _spread(buildSchema)